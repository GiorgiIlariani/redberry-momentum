"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";
import Image from "next/image";

export function AddEmployeeModal() {
  return (
    <DialogContent className="bg-white min-w-[913px] h-[766px] rounded-[10px]">
      <div className="w-full">
        <DialogTitle className="text-[#021526] font-medium text-[32px] text-center pt-[67px]">
          თანამშრომლის შექმნა
        </DialogTitle>
      </div>
      <AddEmployeeForm />
    </DialogContent>
  );
}
