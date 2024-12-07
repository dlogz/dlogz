import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import PromiseButton from "../ui/PromiseButton";
import { useAccount, useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { deserialize, packGroth16Proof } from "@anon-aadhaar/core";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface AnonVerificationProps {
    userContract: `0x${string}`
}

export default function AnonVerification({ userContract }: AnonVerificationProps) {
    console.log(userContract, "User Contract");
    const { address } = useAccount();

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
                <Button onClick={() => localStorage.removeItem("anonAadhaar")}>Refresh Proof</Button>
                <PromiseButton onClick={broadcastProof}>
                    Broadcast to verify your account
                </PromiseButton>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full self-center max-w-screen-xl px-10">
            <LaunchProveModal
                signal={address}
                nullifierSeed={BigInt(process.env.NEXT_PUBLIC_NULLIFIER_SEED!)}
                fieldsToReveal={["revealAgeAbove18"]}
                buttonTitle="Verify your Age"
            />
        </div>
    );
}
