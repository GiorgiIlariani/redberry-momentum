"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";
import { SelectLabel } from "../ui/select";
import Image from "next/image";

export function AddEmployeeModal({
  open,
  setOpen,
  from,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  from: "/create-assignment" | "/";
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {from === "/" ? (
        <DialogTrigger
          className="text-[#212529] px-5 bg-transparent hover:bg-transparent cursor-pointer border border-[#8338EC] h-[39px] rounded-[5px]"
          onClick={() => setOpen(true)}
        >
          თანამშრომლის შექმნა
        </DialogTrigger>
      ) : (
        <SelectLabel
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 p-[14px] cursor-pointer hover:bg-gray-100 px-3 py-2"
        >
          <Image
            src="/assets/plus-icon.png"
            alt="Add Employee"
            width={20}
            height={20}
          />
          <span className="text-[#8338EC] text-base">დაამატე თანამშრომელი</span>
        </SelectLabel>
      )}

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
