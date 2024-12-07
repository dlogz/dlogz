import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Wallet } from "./nav/Wallet";

export default function ConnectWalletPage() {
  return (
    <div className="w-full max-w-md p-10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">
          Connect Your Wallet
        </CardTitle>
        <CardDescription>
          Connect your Coinbase Wallet to use our app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex justify-center items-center">
        <Wallet />
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        By connecting your wallet, you agree to our Terms of Service and Privacy
        Policy
      </CardFooter>
    </div>
  );
}
