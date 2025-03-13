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
import FormFieldComponent from "./FormFieldComponent";
import ImageUpload from "./ImageUpload";

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
            <div className="flex-1">
              <FormFieldComponent
                form={form}
                name="name"
                label="სახელი"
                type="input"
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

            <div className="flex-1">
              <FormFieldComponent
                form={form}
                name="username"
                label="გვარი"
                type="input"
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
          </div>

          <ImageUpload
            form={form}
            image={image}
            onChange={onChange}
            onDelete={onDelete}
          />

          <div className="w-full flex items-center gap-[45px] mt-[45px]">
            <div className="flex-1">
              <FormFieldComponent
                form={form}
                name="department_id"
                label="დეპარტამენტი"
                type="select"
                required
                options={departments.map((dept) => ({
                  id: dept.id, // Matches Option interface
                  name: dept.name,
                }))}
                placeholder="აირჩიეთ დეპარტამენტი"
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
