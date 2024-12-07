import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import PromiseButton from "../ui/PromiseButton";
import { useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { sepolia } from "wagmi/chains";
import { deserialize, packGroth16Proof } from "@anon-aadhaar/core";
import { toast } from "sonner";

interface AnonVerificationProps {
    userContract: `0x${string}`
}

export default function AnonVerification({ userContract }: AnonVerificationProps) {
    console.log(userContract, "User Contract");

    const [anonAadhaar] = useAnonAadhaar();
    const { writeContractAsync } = useWriteContract()


    if (anonAadhaar.status === "logged-in") {

        const broadcastProof = async () => {
            try {

                const anonProof = await deserialize(
                    anonAadhaar.anonAadhaarProofs[Object.keys(anonAadhaar.anonAadhaarProofs).length - 1].pcd
                );
                const packedGroth16Proof = packGroth16Proof(
                    anonProof.proof.groth16Proof
                );

                console.log(packedGroth16Proof, anonProof.proof);
                const _tx = await writeContractAsync({
                    abi: USER_CONTRACT_ABI,
                    functionName: 'verifyUserProof',
                    address: userContract as `0x${string}`,
                    chain: sepolia,
                    args: [
                        anonProof.proof.nullifierSeed,
                        anonProof.proof.nullifier,
                        anonProof.proof.timestamp,
                        [
                            anonProof.proof.ageAbove18,
                            anonProof.proof.gender,
                            anonProof.proof.pincode,
                            anonProof.proof.state,
                        ],
                        packedGroth16Proof
                    ] as any,
                    gas: BigInt(500000),
                    gasPrice: BigInt(500000),
                })
                console.log(_tx);
            } catch (e) {
                console.log(e);
                toast.error("Failed to broadcast proof");
            }
        }

        return (
            <div className="flex flex-col w-full self-center max-w-screen-xl px-10 border rounded-md p-4">
                <h1 className="text-2xl font-bold mb-6">
                    Anon Proof is ready!
                </h1>
                <PromiseButton onClick={broadcastProof}>
                    Broadcast to verify your account
                </PromiseButton>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full self-center max-w-screen-xl px-10">
            <LaunchProveModal
                nullifierSeed={1234}
                fieldsToReveal={["revealAgeAbove18"]}
                buttonTitle="Verify your Age"
            />
        </div>
    );
}
