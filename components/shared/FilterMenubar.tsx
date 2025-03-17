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
import { Button } from "../ui/button";

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

  // Local state (does NOT update URL immediately)
  const [departmentsTemp, setDepartmentsTemp] = useState<string[]>([]);
  const [prioritiesTemp, setPrioritiesTemp] = useState<string[]>([]);
  const [employeeTemp, setEmployeeTemp] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setDepartmentsTemp(params.get("departments")?.split(",") || []);
    setPrioritiesTemp(params.get("priorities")?.split(",") || []);
    setEmployeeTemp(params.get("employee") || null);
  }, [searchParams]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (departmentsTemp.length)
      params.set("departments", departmentsTemp.join(","));
    if (prioritiesTemp.length)
      params.set("priorities", prioritiesTemp.join(","));
    if (employeeTemp) params.set("employee", employeeTemp);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Menubar className="max-w-[688px] flex">
      {/* Departments */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          დეპარტამენტი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] overflow-y-auto max-h-[224px]">
          {departments.map((dept) => (
            <div className="flex items-center space-x-2" key={dept.id}>
              <Checkbox
                id={String(dept.id)}
                checked={departmentsTemp.includes(String(dept.id))}
                onCheckedChange={() =>
                  setDepartmentsTemp((prev) =>
                    prev.includes(String(dept.id))
                      ? prev.filter((d) => d !== String(dept.id))
                      : [...prev, String(dept.id)]
                  )
                }
              />
              <label className="text-base text-[#212529]">{dept.name}</label>
            </div>
          ))}

          <Button
            onClick={updateURL}
            className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
          >
            არჩევა
          </Button>
        </MenubarContent>
      </MenubarMenu>

      {/* Priorities */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          პრიორიტეტი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent
          align="center"
          className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px]"
        >
          {priorities.map((priority) => (
            <div className="flex items-center space-x-2" key={priority.id}>
              <Checkbox
                id={String(priority.id)}
                checked={prioritiesTemp.includes(String(priority.id))}
                onCheckedChange={() =>
                  setPrioritiesTemp((prev) =>
                    prev.includes(String(priority.id))
                      ? prev.filter((p) => p !== String(priority.id))
                      : [...prev, String(priority.id)]
                  )
                }
              />
              <label className="text-base text-[#212529]">
                {priority.name}
              </label>
            </div>
          ))}
          <Button
            onClick={updateURL}
            className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
          >
            არჩევა
          </Button>
        </MenubarContent>
      </MenubarMenu>

      {/* Employees */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          თანამშრომელი <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent
          align="end"
          className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] overflow-y-auto max-h-[224px]"
        >
          {employees.map((employee) => (
            <div className="flex items-center space-x-2" key={employee.id}>
              <Checkbox
                id={String(employee.id)}
                checked={employeeTemp === String(employee.id)}
                onCheckedChange={() =>
                  setEmployeeTemp((prev) =>
                    prev === String(employee.id) ? null : String(employee.id)
                  )
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
          <Button
            onClick={updateURL}
            className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
          >
            არჩევა
          </Button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
