"use client";

import { AddEmployeeFormSchema } from "@/lib/validation";
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
import { Input } from "../ui/input";
import Image from "next/image";
import { getValidationClass, handleFileChange } from "@/utils";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { apiRequest } from "@/lib/actions";
import { DialogClose } from "../ui/dialog";

const AddEmployeeForm = () => {
  const [image, setImage] = useState("");
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);

  const form = useForm<z.infer<typeof AddEmployeeFormSchema>>({
    resolver: zodResolver(AddEmployeeFormSchema),
    defaultValues: {
      name: "",
      username: "",
      avatar: "",
      department_id: "",
    },
  });

  const onChange = async (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const image = await handleFileChange(file);

    if (image) {
      form.setValue("avatar", image as string, { shouldValidate: true }); // ✅ Forces validation update
      setImage(image as string);
    }
  };

  const onDelete = () => {
    form.resetField("avatar");
    setImage("");
  };

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const response = await apiRequest("departments", "GET");
        setDepartments(response || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    getAllDepartments();
  }, []);

  const onSubmit = async (values: z.infer<typeof AddEmployeeFormSchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.username);
      formData.append("department_id", values.department_id);

      if (values.avatar) {
        const response = await fetch(values.avatar);
        const blob = await response.blob();
        formData.append("avatar", blob, "avatar.jpg");
      }

      const result = await apiRequest("employees", "POST", formData, true);

      if (result) {
        console.log("Employee added successfully:", result);
        form.reset();
        setImage("");
      }
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex items-center gap-[45px]">
            {/* Name Field */}
            <div className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#343A40]">
                        სახელი*
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      {/* Validation Messages */}
                      <div className="text-sm mt-1 space-y-1">
                        {/* Min Length Validation */}
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <Image
                            src="/assets/check-icon.png"
                            alt="Check Icon"
                            width={16}
                            height={16}
                          />
                          <span>მინიმუმ ორი სიმბოლო</span>
                        </div>

                        {/* Max Length Validation */}
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <Image
                            src="/assets/check-icon.png"
                            alt="Check Icon"
                            width={16}
                            height={16}
                          />
                          <span>მაქსიმუმ 255 სიმბოლო</span>
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* Username Field */}
            <div className="flex-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#343A40]">
                        გვარი*
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      {/* Validation Messages */}
                      <div className="text-sm mt-1 space-y-1">
                        {/* Min Length Validation */}
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <Image
                            src="/assets/check-icon.png"
                            alt="Check Icon"
                            width={16}
                            height={16}
                          />
                          <span>მინიმუმ ორი სიმბოლო</span>
                        </div>

                        {/* Max Length Validation */}
                        <div
                          className={`flex items-center gap-2 ${getValidationClass(
                            field.value,
                            2,
                            255
                          )}`}
                        >
                          <Image
                            src="/assets/check-icon.png"
                            alt="Check Icon"
                            width={16}
                            height={16}
                          />
                          <span>მაქსიმუმ 255 სიმბოლო</span>
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          {/* image field */}
          <div className="w-full flex flex-col gap-2 mt-[45px]">
            <Label
              htmlFor="image"
              className="text-sm text-[#343A40] font-medium border-none"
            >
              ავატარი*
            </Label>

            <Label
              className={`w-full flex justify-center items-center h-[120px] border border-dashed ${
                form.formState.errors.avatar
                  ? "border-red-500"
                  : "border-[#CED4DA]"
              }  rounded-lg cursor-pointer`}
            >
              {image ? (
                <div className="relative w-max">
                  <Image
                    src={image}
                    alt="avatar logo"
                    width={88}
                    height={88}
                    className="rounded-full object-cover w-[88px] h-[88px]"
                  />
                  <button
                    type="button"
                    onClick={onDelete}
                    className="absolute right-0 bottom-0 rounded-full p-[5px] bg-white border border-[#6C757D] text-sm text-[#6C757D] cursor-pointer"
                  >
                    <Image
                      src="/assets/delete-icon.png"
                      alt="delete"
                      width={14}
                      height={14}
                      className="w-[14px] h-[14px] object-contain"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-[7px] items-center">
                  <Image
                    src="/assets/upload.png"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                  <p className="text-[#343A40] text-sm">ატვირთეთ ფოტო</p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                id="image"
                className="border hidden"
                {...form.register("avatar")}
                onChange={(e) => onChange("image", e)}
              />
            </Label>
          </div>

          <div className="w-full flex items-center gap-[45px] mt-[45px]">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium ${
                        form.formState.errors.department_id
                          ? "text-red-500"
                          : "text-[#343A40]"
                      }`}
                    >
                      დეპარტამენტი*
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)} // Store ID in form state
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`w-full ${
                            form.formState.errors.department_id
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#CED4DA] focus:ring-[#CED4DA]"
                          }`}
                        >
                          <SelectValue placeholder="აირჩიეთ დეპარტამენტი">
                            {departments.find((dept) => dept.id === field.value)
                              ?.name || "აირჩიეთ დეპარტამენტი"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
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
            <div className="flex-1" />
          </div>

          <div className="flex items-center gap-4 mt-[25px] justify-end">
            <DialogClose className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] gap-1 flex items-center rounded-md">
              გაუქმება
            </DialogClose>
            <Button
              type="submit"
              className="text-[#212529] px-5 bg-transparent hover:bg-transparent cursor-pointer border border-[#8338EC] h-[39px]"
            >
              დაამატე თანამშრომელი
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEmployeeForm;
