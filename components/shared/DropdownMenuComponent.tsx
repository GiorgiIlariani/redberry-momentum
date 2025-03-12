import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { FiChevronDown } from "react-icons/fi";
// import { AddAgentModal } from "./AddAgentModal";

const DropdownMenuComponent = ({
  employees,
}: //   onSelectAgent,
//   error,
{
  employees: employees[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`w-full h-[40px] p-[10px] rounded-md flex justify-between items-center border border-[#808A93] outline-none 
       
      }`}
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-[385px]">
        {/* <AddAgentModal type="from-addListing" /> */}
        {employees.map((employee) => (
          <DropdownMenuItem
            key={employee.id}
            className="bg-white text-sm font-normal cursor-pointer"
          >
            {employee.name} {employee.surname}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
