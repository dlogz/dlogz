import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import PromiseButton from "../ui/PromiseButton";
import { useAccount, useWriteContract } from "wagmi";
import { USER_CONTRACT_ABI } from "@/contracts/usercontract.abi";
import { deserialize, packGroth16Proof } from "@anon-aadhaar/core";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Shield, Lock, UserCheck, AlertCircle } from "lucide-react";

interface AnonVerificationProps {
  userContract: `0x${string}`;
}

export default function AnonVerification({
  userContract,
}: AnonVerificationProps) {
  const { address } = useAccount();
  const [anonAadhaar] = useAnonAadhaar();
  const { writeContractAsync } = useWriteContract();

  if (anonAadhaar.status === "logged-in") {
    const broadcastProof = async () => {
      try {
        const anonProof = await deserialize(
          anonAadhaar.anonAadhaarProofs[
            Object.keys(anonAadhaar.anonAadhaarProofs).length - 1
          ].pcd
        );
        const packedGroth16Proof = packGroth16Proof(
          anonProof.proof.groth16Proof
        );

        const _tx = await writeContractAsync({
          abi: USER_CONTRACT_ABI,
          functionName: "verifyUserProof",
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
            packedGroth16Proof,
          ] as any,
        });

        console.log(_tx);

        toast.success("Proof broadcasted successfully!");
      } catch (e) {
        console.log(e);
        toast.error("Failed to broadcast proof");
      }
    };

    return (
      <div className="flex flex-col w-full self-center max-w-screen-xl px-10 py-8 border rounded-xl bg-gradient-to-br from-purple-50 to-green-50">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-green-600 bg-clip-text text-transparent">
            Anon Proof Verified!
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-green-700">
            <UserCheck className="w-5 h-5" />
            <span>Age verification completed using Zero Knowledge Proofs</span>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => localStorage.removeItem("anonAadhaar")}
              variant="outline"
              className="gap-2"
            >
              <Lock className="w-4 h-4" />
              Refresh Proof
            </Button>
            <PromiseButton
              onClick={broadcastProof}
              className="gap-2 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
            >
              <Shield className="w-4 h-4" />
              Broadcast Proof
            </PromiseButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full self-center max-w-screen-xl px-10 py-8 border rounded-xl bg-opacity-15 bg-white">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-900 to-green-600 bg-clip-text text-transparent">
          Age Verification Required
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Verify your age privately using Anon Aadhaars Zero Knowledge Proofs.
          Your Aadhaar data remains secure and private.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <Shield className="w-6 h-6 mb-2 text-purple-600" />
          <h3 className="text-black font-semibold mb-1">Privacy First</h3>
          <p className="text-sm text-gray-600">
            Zero knowledge proofs protect your personal information
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <Lock className="w-6 h-6 mb-2 text-green-600" />
          <h3 className="text-black font-semibold mb-1">Secure Verification</h3>
          <p className="text-sm text-gray-600">
            Verify age without sharing Aadhaar details
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <UserCheck className="w-6 h-6 mb-2 text-blue-600" />
          <h3 className="text-black font-semibold mb-1">Quick Process</h3>
          <p className="text-sm text-gray-600">
            Simple one-time verification process
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <LaunchProveModal
          signal={address}
          nullifierSeed={BigInt(process.env.NEXT_PUBLIC_NULLIFIER_SEED!)}
          fieldsToReveal={["revealAgeAbove18"]}
          buttonTitle="Verify Age with Anon Aadhaar"
        />
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://anon-aadhaar.pse.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
        >
          Powered by Anon Aadhaar
          <Shield className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
