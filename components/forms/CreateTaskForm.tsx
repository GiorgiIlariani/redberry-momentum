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

import { DatePicker } from "../shared/DatePicker";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import FormFieldComponent from "../shared/FormFieldComponent";
import { format, addDays } from "date-fns";

const CreateTaskForm = ({
  departments,
  employees,
  statuses,
  priorities,
}: CreateAssignmentFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const storedFormData = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("formData")) || "{}"
  );

  const form = useForm<z.infer<typeof CreateAssignmentFormSchema>>({
    resolver: zodResolver(CreateAssignmentFormSchema),
    defaultValues: {
      title: storedFormData.title || "",
      description: storedFormData.description || "",
      due_date:
        storedFormData.due_date || format(addDays(new Date(), 1), "yyyy-MM-dd"),
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
      setIsLoading(true);
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
        form.reset();
        router.push("/");
        typeof window !== "undefined" && localStorage.removeItem("formData");
      }
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    if (storedFormData.department_id) {
      setSelectedDepartment(storedFormData.department_id);
    }

    // Wait for selectedDepartment to be set, then update the form's employee_id
    setTimeout(() => {
      if (storedFormData.employee_id) {
        form.setValue("employee_id", storedFormData.employee_id);
      }
    }, 0);
  }, []);

  useEffect(() => {
    typeof window !== "undefined" && localStorage.removeItem("formData");
  }, [pathname]);

  const error = form.formState.errors;

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
                  error={error.title}
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
                  required
                  validation={{
                    minLength: 2,
                    maxLength: 255,
                    messages: {
                      minLength: "მინიმუმ ოთხი სიტყვა",
                      maxLength: "მაქსიმუმ 255 სიმბოლო",
                    },
                  }}
                  error={error.description}
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
                  addEmployee
                  open={open}
                  setOpen={setOpen}
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
                      <FormLabel className="text-sm text-[#343A40] font-medium">
                        დედლაინი*
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          isDirty={form.getFieldState("due_date").isDirty}
                          error={!form.getFieldState("due_date").error}
                          date={field.value ? new Date(field.value) : undefined}
                          onChange={(selectedDate) => {
                            field.onChange(
                              selectedDate
                                ? format(selectedDate, "yyyy-MM-dd")
                                : ""
                            );
                            form.trigger("due_date");
                          }}
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
                {isLoading ? "იქმნება..." : "დავალების შექმნა"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTaskForm;
