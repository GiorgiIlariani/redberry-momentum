"use client";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function FilterMenubar({
  priorities,
  departments,
  employees,
}: {
  priorities: priority[];
  departments: department[];
  employees: employee[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setSelectedDepartments(params.get("departments")?.split(",") || []);
    setSelectedPriorities(params.get("priorities")?.split(",") || []);
    setSelectedEmployee(params.get("employees") || null);
  }, [searchParams]);

  const updateURL = (key: string, value: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (value.length) {
      params.set(key, value.join(","));
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleDepartmentChange = (id: string) => {
    const updated = selectedDepartments.includes(id)
      ? selectedDepartments.filter((d) => d !== id)
      : [...selectedDepartments, id];
    setSelectedDepartments(updated);
    updateURL("departments", updated);
  };

  const handlePriorityChange = (id: string) => {
    const updated = selectedPriorities.includes(id)
      ? selectedPriorities.filter((p) => p !== id)
      : [...selectedPriorities, id];
    setSelectedPriorities(updated);
    updateURL("priorities", updated);
  };

  const handleEmployeeChange = (id: string) => {
    const updated = selectedEmployee === id ? null : id;
    setSelectedEmployee(updated);
    updateURL("employees", updated ? [updated] : []);
  };

  return (
    <Menubar className="max-w-[688px] flex">
      {/* Departments */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          დეპარტამენტი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px]">
          {departments.slice(0, 4).map((dept) => (
            <div className="flex items-center space-x-2" key={dept.id}>
              <Checkbox
                id={String(dept.id)}
                checked={selectedDepartments.includes(String(dept.id))}
                onCheckedChange={() => handleDepartmentChange(String(dept.id))}
              />
              <label className="text-base text-[#212529]">{dept.name}</label>
            </div>
          ))}
        </MenubarContent>
      </MenubarMenu>

      {/* Priorities */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          პრიორიტეტი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px]">
          {priorities.map((priority) => (
            <div className="flex items-center space-x-2" key={priority.id}>
              <Checkbox
                id={String(priority.id)}
                checked={selectedPriorities.includes(String(priority.id))}
                onCheckedChange={() =>
                  handlePriorityChange(String(priority.id))
                }
              />
              <label className="text-base text-[#212529]">
                {priority.name}
              </label>
            </div>
          ))}
        </MenubarContent>
      </MenubarMenu>

      {/* Employees */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          თანამშრომელი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] overflow-y-auto max-h-[224px]">
          {employees.map((employee) => (
            <div className="flex items-center space-x-2" key={employee.id}>
              <Checkbox
                id={String(employee.id)}
                checked={selectedEmployee === String(employee.id)}
                onCheckedChange={() =>
                  handleEmployeeChange(String(employee.id))
                }
              />
              <div className="flex items-center gap-[10px]">
                <Image
                  src={employee.avatar}
                  alt={employee.name}
                  width={28}
                  height={28}
                  className="w-[28px] h-[28px] rounded-full object-cover"
                />
                <span className="text-base text-[#212529]">
                  {employee.name} {employee.surname}
                </span>
              </div>
            </div>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
