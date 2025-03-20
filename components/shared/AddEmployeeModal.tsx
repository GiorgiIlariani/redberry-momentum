import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddEmployeeForm from "../forms/AddEmployeeForm";

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
