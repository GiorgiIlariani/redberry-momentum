"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";
import { useState } from "react";

export function AddEmployeeModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="text-[#212529] px-5 bg-transparent hover:bg-transparent cursor-pointer border border-[#8338EC] h-[39px] rounded-[5px]"
        onClick={() => setOpen(true)}
      >
        თანამშრომლის შექმნა
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[913px] h-[766px] rounded-[10px]">
        <div className="w-full">
          <DialogTitle className="text-[#021526] font-medium text-[32px] text-center pt-[67px]">
            თანამშრომლის შექმნა
          </DialogTitle>
        </div>
        {/* add employee modal form */}
        <AddEmployeeForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
