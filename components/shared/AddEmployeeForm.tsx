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
import { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image"; // Import Next.js Image

const AddEmployeeForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AddEmployeeFormSchema>>({
    resolver: zodResolver(AddEmployeeFormSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  const getValidationClass = (value: string, min: number, max: number) => {
    if (!value) return "text-black"; // Default (Black)
    if (value.length < min || value.length > max) return "text-red-500"; // Error (Red)
    return "text-green-500"; // Success (Green)
  };

  return (
    <div className="w-full flex flex-col">
      <Form {...form}>
        <form>
          <div className="w-full flex items-center gap-[45px]">
            {/* Name Field */}
            <div className="w-full flex-1">
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
            <div className="w-full flex-1">
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

          <div className="flex items-center gap-4 mt-[25px] justify-end">
            <Button className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] gap-1 flex items-center">
              გაუქმება
            </Button>
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
