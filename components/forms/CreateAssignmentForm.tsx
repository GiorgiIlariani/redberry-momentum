"use client";

import { CreateAssignmentFormSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getValidationClass } from "@/utils";
import { Textarea } from "../ui/textarea";
import DropdownMenuComponent from "../shared/DropdownMenuComponent";
import { DatePicker } from "../shared/DatePicker";
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiRequest } from "@/lib/actions";
import { useRouter } from "next/navigation";
import FormFieldComponent from "../shared/FormFieldComponent";

const CreateAssignmentForm = ({
  departments,
  employees,
  statuses,
  priorities,
}: CreateAssignmentFormProps) => {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const storedFormData = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("formData")) || "{}"
  );

  const form = useForm<z.infer<typeof CreateAssignmentFormSchema>>({
    resolver: zodResolver(CreateAssignmentFormSchema),
    defaultValues: {
      title: storedFormData.title || "",
      description: storedFormData.description || "",
      due_date: storedFormData.due_date || new Date().toISOString(),
      status_id: storedFormData.status_id || "1",
      employee_id: storedFormData.employee_id || "",
      priority_id: storedFormData.priority_id || "2",
      department_id: storedFormData.department_id || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CreateAssignmentFormSchema>
  ) => {
    try {
      const payload = {
        name: values.title,
        description: values.description,
        due_date: new Date(values.due_date).toISOString().split("T")[0],
        status_id: Number(values.status_id), // Ensure these are numbers
        employee_id: Number(values.employee_id),
        priority_id: Number(values.priority_id),
      };

      const result = await apiRequest("tasks", "POST", payload, false);

      if (result) {
        console.log("Assignment created successfully:", result);
        // form.reset();
        // router.push("/");
      }
    } catch (error) {
      console.error("Failed to create assignment:", error);
    }
  };

  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    if (selectedDepartment) {
      const filtered = employees.filter(
        (emp) => emp.department.id === Number(selectedDepartment)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [selectedDepartment, employees]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      typeof window !== "undefined" &&
        localStorage.setItem("formData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const error = form.formState.errors;

  console.log({ error });

  return (
    <div className="w-full flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full pl-[55px] pt-[65px] pr-[368px] border border-[#DDD2FF] h-[958px] mt-5">
            <div className="w-full flex items-start gap-[161px]">
              <div className="w-full flex-1">
                <FormFieldComponent
                  type="input"
                  form={form}
                  name="title"
                  label="სათაური"
                  required
                  validation={{
                    minLength: 2,
                    maxLength: 255,
                    messages: {
                      minLength: "მინიმუმ ორი სიმბოლო",
                      maxLength: "მაქსიმუმ 255 სიმბოლო",
                    },
                  }}
                />
              </div>
              <div className="w-full flex-1">
                <FormFieldComponent
                  form={form}
                  name="department_id"
                  label="დეპარტამენტი"
                  type="select"
                  options={departments}
                  placeholder="დიზაინის დეპარტამენტი"
                  required
                  onValueChange={(value) => setSelectedDepartment(value)} // 🔥 Update the selected department
                />
              </div>
            </div>
            <div className="w-full flex items-start gap-[161px] mt-[55px]">
              <div className="w-full flex-1">
                <FormFieldComponent
                  form={form}
                  name="description"
                  label="აღწერა"
                  type="textarea"
                  validation={{
                    minLength: 2,
                    maxLength: 255,
                    messages: {
                      minLength: "მინიმუმ ორი სიმბოლო",
                      maxLength: "მაქსიმუმ 255 სიმბოლო",
                    },
                  }}
                />
              </div>
              <div className="w-full flex-1">
                <FormFieldComponent
                  form={form}
                  name="employee_id"
                  label="პასუხისხმეგებლი თანამშრომელი"
                  type="select"
                  options={filteredEmployees}
                  placeholder="თანამშრომლის არჩევა"
                  required
                  withAvatar
                  disabled={!form.watch("department_id")}
                  customLabelClass="text-[#ADB5BD]"
                  // addEmploye={}
                />
              </div>
            </div>

            <div className="w-full flex items-start gap-[161px] mt-[55px]">
              <div className="flex-1 flex items-center gap-8">
                <div className="w-full">
                  <FormFieldComponent
                    form={form}
                    name="priority_id"
                    label="პრიორიტეტი"
                    type="select"
                    options={priorities}
                    placeholder="აირჩიეთ პრიორიტეტი"
                    required
                    withIcon
                  />
                </div>
                <div className="w-full">
                  <FormFieldComponent
                    form={form}
                    name="status_id"
                    label="სტატუსი"
                    type="select"
                    options={statuses}
                    placeholder="აირჩიეთ სტატუსი"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#343A40]">
                        დედლაინი*
                      </FormLabel>
                      <FormControl className="w-full flex-1">
                        <DatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          onChange={(selectedDate) =>
                            field.onChange(
                              selectedDate ? selectedDate.toISOString() : ""
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] gap-1 flex items-center rounded-md mt-[145px]"
              >
                დავალების შექმნა
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAssignmentForm;
