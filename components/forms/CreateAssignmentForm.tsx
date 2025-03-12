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

const CreateAssignmentForm = ({
  departments,
  employees,
  statuses,
  priorities,
}: CreateAssignmentFormProps) => {
  const form = useForm<z.infer<typeof CreateAssignmentFormSchema>>({
    resolver: zodResolver(CreateAssignmentFormSchema),
    defaultValues: {
      title: "",
      description: "",
      due_date: new Date().toISOString(),
      status_id: "",
      employee_id: "",
      priority_id: "",
      department_id: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CreateAssignmentFormSchema>
  ) => {
    console.log({ values });
  };

  return (
    <div className="w-full flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full pl-[55px] pt-[65px] pr-[368px] border border-[#DDD2FF] h-[958px] mt-5">
            <div className="w-full flex items-start gap-[161px]">
              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#343A40]">
                        სათაური*
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <div className="text-sm mt-1 space-y-1">
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <span>მინიმუმ ორი სიმბოლო</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <span>მაქსიმუმ 255 სიმბოლო</span>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#343A40]">
                        დეპარტამენტი*
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              form.formState.errors.department_id
                                ? "border-red-500 focus:ring-red-500"
                                : "border-[#CED4DA] focus:ring-[#CED4DA]"
                            }`}
                          >
                            <SelectValue placeholder="დიზაინის დეპარტამენტი" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((option) => (
                              <SelectItem key={option.id} value={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-start gap-[161px] mt-[55px]">
              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#343A40]">
                        აღწერა
                      </FormLabel>
                      <FormControl>
                        <Textarea className="h-[133px]" {...field} />
                      </FormControl>
                      <div className="text-sm mt-1 space-y-1">
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value || "",
                            2,
                            255
                          )}`}
                        >
                          <span>მინიმუმ ორი სიმბოლო</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value || "",
                            2,
                            255
                          )}`}
                        >
                          <span>მაქსიმუმ 255 სიმბოლო</span>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex-1">
                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-[#343A40]">
                        პასუხისხმეგებლი თანამშრომელი*
                      </FormLabel>
                      <DropdownMenuComponent employees={employees} />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex items-start gap-[161px] mt-[55px]">
              <div className="flex-1 flex items-center gap-8">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="priority_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#343A40]">
                          პრიორიტეტი*
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value?.toString()}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                form.formState.errors.priority_id
                                  ? "border-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorities.map((priority) => (
                                <SelectItem
                                  key={priority.id}
                                  value={priority.id.toString()}
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={priority.icon}
                                      alt={priority.name}
                                      className="w-5 h-5"
                                    />
                                    <span>{priority.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="status_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-[#343A40]">
                          სტატუსი*
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value?.toString()}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                form.formState.errors.status_id
                                  ? "border-red-500"
                                  : ""
                              }`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statuses.map((status) => (
                                <SelectItem
                                  key={status.id}
                                  value={status.id.toString()}
                                >
                                  {status.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
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
              <Button className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] gap-1 flex items-center rounded-md mt-[145px]">
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
