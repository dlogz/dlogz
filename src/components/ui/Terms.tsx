import { terms } from "@/src/lib/Term";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "./dialog";
import React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Button } from "./button";

function Terms({
  termsChecked,
  setTermsChecked,
  onContinue,
}: {
  termsChecked: boolean;
  setTermsChecked: (checked: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Read Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto pr-2 my-4">{terms}</div>
        <DialogFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsChecked}
              onCheckedChange={(checked) => setTermsChecked(!!checked)}
            />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
          <Button onClick={onContinue} disabled={!termsChecked}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Terms;
