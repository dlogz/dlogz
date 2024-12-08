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
import { Button } from "./button";

function Terms({ onContinue }: { onContinue: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Terms & Continue</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto pr-2 my-4">{terms}</div>
        <DialogFooter>
          <Button onClick={onContinue}>Accept & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Terms;
