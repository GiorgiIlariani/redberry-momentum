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
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { getValidationClass } from "@/utils";

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
  validation,
  disabled,
  customLabelClass,
  addEmployee,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-base font-medium"
            style={{
              color: disabled ? customLabelClass : "#343A40",
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueChange) onValueChange(value);
                }}
                value={field.value?.toString()}
                disabled={disabled}
              >
                <SelectTrigger
                  className={`w-full ${
                    form.formState.errors[name] ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder={placeholder || "აირჩიეთ"} />
                </SelectTrigger>
                <SelectContent>
                  {/* here i want something and inside text დაამატე თანამშრომელი with plus icon /assets/plus-icon.png and it should can open <AddEmployeeModal /> */}
                  {addEmployee && (
                    <div
                      // onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 p-[14px] cursor-pointer hover:bg-gray-100 px-3 py-2"
                      //  "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
                    >
                      <Image
                        src="/assets/plus-icon.png"
                        alt="Add Employee"
                        width={20}
                        height={20}
                      />
                      <span>დაამატე თანამშრომელი</span>
                    </div>
                  )}
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
                </SelectContent>
              </Select>
            )}
          </FormControl>

          {/* 🔥 Dynamic Validation Messages */}
          {validation && (
            <div className="text-sm mt-1 space-y-1">
              {validation.minLength && (
                <div
                  className={`flex items-center gap-2 ${getValidationClass(
                    field.value,
                    validation.minLength,
                    validation.maxLength
                  )}`}
                >
                  <Image
                    src="/assets/check-icon.png"
                    alt="Check Icon"
                    width={16}
                    height={16}
                  />
                  <span>{validation.messages?.minLength}</span>
                </div>
              )}
              {validation.maxLength && (
                <div
                  className={`flex items-center gap-2 ${getValidationClass(
                    field.value,
                    validation.minLength,
                    validation.maxLength
                  )}`}
                >
                  <Image
                    src="/assets/check-icon.png"
                    alt="Check Icon"
                    width={16}
                    height={16}
                  />
                  <span>{validation.messages?.maxLength}</span>
                </div>
              )}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
