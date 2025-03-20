import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
// import { getValidationClass } from "@/utils";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { CheckIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { generateValidationStyles } from "@/utils";

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
  form,
  name,
  label,
  type,
  options = [],
  placeholder,
  required = false,
  withAvatar = false,
  withIcon = false,
  onValueChange,
  disabled,
  addEmployee,
  error,
  min,
  letters = false,
  max,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-base font-medium "
            style={{
              color: disabled && addEmployee ? "#ADB5BD" : "#343A40",
            }}
          >
            {label} {required && "*"}
          </FormLabel>
          <FormControl>
            {type === "input" ? (
              <Input
                {...field}
                className={`h-[45px] border border-[#DEE2E6] rounded-[5px] p-[14px] !ring-0`}
              />
            ) : type === "textarea" ? (
              <Textarea {...field} className="h-[133px] !ring-0 p-[14px]" />
            ) : (
              <Dialog>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (onValueChange) onValueChange(value);
                  }}
                  value={field.value?.toString()}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={`w-full h-[45px]  ${
                      form.formState.errors[name]
                        ? "border-red-500"
                        : form.getFieldState(name).isDirty
                        ? "border-[#08A508]"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder={placeholder || ""} />
                  </SelectTrigger>
                  <SelectContent>
                    {addEmployee && (
                      <DialogTrigger className="w-full flex items-center gap-2 p-[14px] cursor-pointer hover:bg-gray-100">
                        <Image
                          src="/assets/plus-icon.png"
                          alt="Add Employee"
                          width={20}
                          height={20}
                        />
                        <span className="text-[#8338EC] text-base">
                          დაამატე თანამშრომელი
                        </span>
                      </DialogTrigger>
                    )}

                    <SelectGroup>
                      {options.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id.toString()}
                          className="flex items-center gap-2 p-[14px]"
                        >
                          {withAvatar && option.avatar && (
                            <Image
                              src={option.avatar}
                              alt={option.name}
                              width={28}
                              height={28}
                              className="w-[28px] h-[28px] rounded-full object-cover"
                            />
                          )}
                          {withIcon && option.icon && (
                            <Image
                              src={option.icon}
                              alt={option.name}
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                          )}
                          <span>{option.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {form.formState.errors[name] && (
                  <p className="text-sm text-red-500">სავალდებულო</p>
                )}

                <AddEmployeeModal />
              </Dialog>
            )}
          </FormControl>

          {(type === "input" || type === "textarea") && (
            <div>
              {type === "input" && (
                <p
                  className={`flex items-center gap-1 text-[10px] font-[350] ${
                    error && "text-[#FA4D4D]"
                  } ${generateValidationStyles(
                    form.getFieldState(name).isDirty,
                    field.value,
                    min!,
                    "min",
                    "input"
                  )}`}
                >
                  <CheckIcon className="w-4 h-4" /> მინიმუმ {min} სიმბოლი
                </p>
              )}

              <p
                className={`flex items-center gap-1 text-[10px] font-[350]  ${
                  error && "text-[#FA4D4D]"
                } ${generateValidationStyles(
                  form.getFieldState(name).isDirty,
                  field.value,
                  min!,
                  "max",
                  "input"
                )}`}
              >
                <CheckIcon className="w-4 h-4" /> მაქსიმუმ {max} სიმბოლი
              </p>
              {letters && (
                <p
                  className={`flex items-center gap-1 text-[10px] font-[350] ${
                    error && "text-[#FA4D4D]"
                  } ${generateValidationStyles(
                    form.getFieldState(name).isDirty,
                    field.value,
                    min!,
                    "letters",
                    "input"
                  )}`}
                >
                  <CheckIcon className="w-4 h-4" /> მხოლოდ ქართული ან ლათინური
                  ასოები
                </p>
              )}

              {type === "textarea" && (
                <p
                  className={`flex items-center gap-1 text-[10px] font-[350] ${
                    error && "text-[#FA4D4D]"
                  } ${generateValidationStyles(
                    form.getFieldState(name).isDirty,
                    field.value,
                    min!,
                    "letters",
                    "textarea"
                  )}`}
                >
                  <CheckIcon className="w-4 h-4" /> მინიმუმ 4 სიტყვა
                </p>
              )}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
