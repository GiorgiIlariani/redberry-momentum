"use client";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { departmentShortNames } from "@/constants";

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

  // Temporary states for selections
  const [departmentsTemp, setDepartmentsTemp] = useState<string[]>([]);
  const [prioritiesTemp, setPrioritiesTemp] = useState<string[]>([]);
  const [employeeTemp, setEmployeeTemp] = useState<string | null>(null);

  // Applied filters (updated only when clicking 'არჩევა')
  const [appliedDepartments, setAppliedDepartments] = useState<string[]>([]);
  const [appliedPriorities, setAppliedPriorities] = useState<string[]>([]);
  const [appliedEmployee, setAppliedEmployee] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const departmentsFromParams = params.get("departments")?.split(",") || [];
    const prioritiesFromParams = params.get("priorities")?.split(",") || [];
    const employeeFromParams = params.get("employee") || null;

    setDepartmentsTemp(departmentsFromParams);
    setPrioritiesTemp(prioritiesFromParams);
    setEmployeeTemp(employeeFromParams);

    setAppliedDepartments(departmentsFromParams);
    setAppliedPriorities(prioritiesFromParams);
    setAppliedEmployee(employeeFromParams);
  }, [searchParams]);

  // Apply selected filters and update the URL
  const updateURL = (filterType: "departments" | "priorities" | "employee") => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "departments") {
      setAppliedDepartments([...departmentsTemp]);
      if (departmentsTemp.length) {
        params.set("departments", departmentsTemp.join(","));
      } else {
        params.delete("departments");
      }
    }

    if (filterType === "priorities") {
      setAppliedPriorities([...prioritiesTemp]);
      if (prioritiesTemp.length) {
        params.set("priorities", prioritiesTemp.join(","));
      } else {
        params.delete("priorities");
      }
    }

    if (filterType === "employee") {
      setAppliedEmployee(employeeTemp);
      if (employeeTemp) {
        params.set("employee", employeeTemp);
      } else {
        params.delete("employee");
      }
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Remove a single filter
  const removeFilter = (
    type: "departments" | "priorities" | "employee",
    value: string
  ) => {
    let newDepartments = [...appliedDepartments];
    let newPriorities = [...appliedPriorities];
    let newEmployee = appliedEmployee;

    if (type === "departments") {
      newDepartments = newDepartments.filter((d) => d !== value);
      setAppliedDepartments(newDepartments);
    } else if (type === "priorities") {
      newPriorities = newPriorities.filter((p) => p !== value);
      setAppliedPriorities(newPriorities);
    } else {
      newEmployee = null;
      setAppliedEmployee(null);
    }

    // Update URL with new values
    const params = new URLSearchParams();
    if (newDepartments.length)
      params.set("departments", newDepartments.join(","));
    if (newPriorities.length) params.set("priorities", newPriorities.join(","));
    if (newEmployee) params.set("employee", newEmployee);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setAppliedDepartments([]);
    setAppliedPriorities([]);
    setAppliedEmployee(null);

    router.push("?", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <Menubar className="max-w-[688px] h-10 flex">
        {/* Departments */}
        <MenubarMenu>
          <MenubarTrigger className="data-[state=open]:[&>*:last-child]:rotate-180 flex flex-1 items-center gap-2 justify-center data-[state=open]:text-[#8338EC]">
            დეპარტამენტი{" "}
            <IoIosArrowDown className="data-[state=open]:text-[#8338EC]" />
          </MenubarTrigger>
          <MenubarContent
            className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] overflow-y-auto max-h-[224px] border-[#8338EC]"
            align="start"
          >
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
                  className="!bg-white !text-black"
                />
                <label className="text-base text-[#212529]">{dept.name}</label>
              </div>
            ))}
            <Button
              onClick={() => updateURL("departments")}
              className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>

        {/* Priorities */}
        <MenubarMenu>
          <MenubarTrigger className="data-[state=open]:[&>*:last-child]:rotate-180 flex flex-1 items-center gap-2 justify-center data-[state=open]:text-[#8338EC]">
            პრიორიტეტი{" "}
            <IoIosArrowDown className="data-[state=open]:text-[#8338EC]" />
          </MenubarTrigger>
          <MenubarContent
            className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] border-[#8338EC]"
            align="center"
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
                  className="!bg-white !text-black"
                />
                <label className="text-base text-[#212529]">
                  {priority.name}
                </label>
              </div>
            ))}
            <Button
              onClick={() => updateURL("priorities")}
              className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>

        {/* Employees */}
        <MenubarMenu>
          <MenubarTrigger className="data-[state=open]:[&>*:last-child]:rotate-180 flex flex-1 items-center gap-2 justify-center data-[state=open]:text-[#8338EC]">
            თანამშრომელი
            <IoIosArrowDown className="data-[state=open]:text-[#8338EC]" />
          </MenubarTrigger>
          <MenubarContent
            className="rounded-[10px] border w-[688px] bg-white h-[274px] px-[30px] pt-10 pb-5 flex flex-col gap-[22px] overflow-y-auto max-h-[224px] border-[#8338EC]"
            align="end"
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
                  className="!bg-white !text-black"
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
              onClick={() => updateURL("employee")}
              className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] w-[155px] self-end mt-[25px] rounded-[20px]"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex flex-wrap gap-2">
        {/* Selected Filters Display */}
        {(appliedDepartments.length > 0 ||
          appliedPriorities.length > 0 ||
          appliedEmployee) && (
          <div className="flex flex-wrap gap-2">
            {appliedDepartments.map((id) => {
              const dept = departments.find((d) => String(d.id) === id);
              const shortName = dept
                ? departmentShortNames[dept.name] || dept.name
                : "";
              return (
                <span
                  key={id}
                  className="flex items-center gap-1 border border-[#CED4DA] py-[6px] px-[10px] rounded-[43px] text-sm text-[#343A40]"
                >
                  {shortName}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removeFilter("departments", id)}
                  />
                </span>
              );
            })}
            {appliedPriorities.map((id) => {
              const priority = priorities.find((p) => String(p.id) === id);
              return (
                <span
                  key={id}
                  className="flex items-center gap-1 border border-[#CED4DA] py-[6px] px-[10px] rounded-[43px] text-sm text-[#343A40]"
                >
                  {priority?.name}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removeFilter("priorities", id)}
                  />
                </span>
              );
            })}
            {appliedEmployee && (
              <span className="flex items-center gap-1 border border-[#CED4DA] py-[6px] px-[10px] rounded-[43px] text-sm text-[#343A40]">
                {employees.find((e) => String(e.id) === appliedEmployee)
                  ? `${
                      employees.find((e) => String(e.id) === appliedEmployee)
                        ?.name
                    } ${
                      employees.find((e) => String(e.id) === appliedEmployee)
                        ?.surname
                    }`
                  : ""}
                <IoClose
                  className="cursor-pointer"
                  onClick={() => removeFilter("employee", appliedEmployee)}
                />
              </span>
            )}
            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="text-sm text-[#343A40] cursor-pointer py-[6px] px-[10px]"
            >
              გასუფთავება
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
