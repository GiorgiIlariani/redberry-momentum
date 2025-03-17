"use client";

import { AddEmployeeFormSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useEffect, useState } from "react";

import { addEmployee, apiRequest } from "@/lib/actions";
import { DialogClose } from "../ui/dialog";
import FormFieldComponent from "./FormFieldComponent";
import ImageUpload from "./ImageUpload";

const AddEmployeeForm = ({ onClose }: { onClose: () => void }) => {
  const [image, setImage] = useState("");
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);

  const form = useForm<z.infer<typeof AddEmployeeFormSchema>>({
    resolver: zodResolver(AddEmployeeFormSchema),
    defaultValues: {
      name: "",
      username: "",
      avatar: undefined,
      department_id: "",
    },
  });

  const onChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("avatar", file, { shouldValidate: true }); // ✅ Pass actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Only for preview
      };
      reader.readAsDataURL(file);
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
        formData.append("avatar", values.avatar);
      }

      const result = await addEmployee(formData);

      console.log({ result });

      if (result) {
        console.log("Employee added successfully:", result);
        form.reset();
        setImage("");
        onClose();
      }
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const error = form.formState.errors;

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
                error={error.name}
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
                error={error.username}
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
