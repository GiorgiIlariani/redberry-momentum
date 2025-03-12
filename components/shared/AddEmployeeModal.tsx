"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import AddEmployeeForm from "./AddEmployeeForm";

export function AddEmployeeModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-[#212529] px-5 bg-transparent hover:bg-transparent cursor-pointer border border-[#8338EC] h-[39px] rounded-[5px]">
        თანამშრომლის შექმნა
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[913px] h-[766px] rounded-[10px]">
        <div className="w-full">
          <DialogTitle className="text-[#021526] font-medium text-[32px] text-center pt-[117px]">
            თანამშრომლის შექმნა
          </DialogTitle>
        </div>
        {/* add employee modal form */}
        <AddEmployeeForm />
      </DialogContent>
    </Dialog>
  );
}
