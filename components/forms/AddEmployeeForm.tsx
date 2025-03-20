"use client";

import { AddEmployeeFormSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useEffect, useRef, useState } from "react";

import { addEmployee, apiRequest } from "@/lib/actions";
import { DialogClose } from "../ui/dialog";
import FormFieldComponent from "../shared/FormFieldComponent";
import ImageUpload from "../shared/ImageUpload";
import { toast } from "sonner";

const AddEmployeeForm = () => {
  const [image, setImage] = useState("");
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);
  const dialogCloseRef = useRef<HTMLButtonElement>(null); // Reference for closing modal

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
      const fileSizeInKB = file.size / 1024;

      if (fileSizeInKB > 600) {
        form.setError("avatar", {
          type: "manual",
          message: "ფაილის ზომა არ უნდა აღემატებოდეს 600 KB-ს",
        });
        return;
      }

      form.clearErrors("avatar"); // Clear error if a valid file is selected
      form.setValue("avatar", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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
        form.reset();
        setImage("");

        // Close modal only after successful request
        dialogCloseRef.current?.click();

        toast("თანამშრომელი წარმატებით შეიქმნა.");
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
                min={2}
                max={255}
                letters
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
                min={2}
                max={255}
                letters
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

          <div className="w-full flex items-center gap-[45px] mt-[25px]">
            <div className="flex-1">
              <FormFieldComponent
                form={form}
                name="department_id"
                label="დეპარტამენტი"
                type="select"
                required
                options={departments.map((dept) => ({
                  id: dept.id,
                  name: dept.name,
                }))}
              />
            </div>
            <div className="flex-1" />
          </div>

          <div className="flex items-center gap-4 mt-[25px] justify-end">
            <DialogClose ref={dialogCloseRef} className="hidden" />
            <DialogClose className="bg-transparent hover:bg-transparent px-5 py-2 cursor-pointer border border-[#8338EC] gap-1 flex items-center rounded-md">
              გაუქმება
            </DialogClose>
            <Button
              type="submit"
              className="text-white bg-[#8338EC] hover:bg-[#8338EC] px-5 cursor-pointer border border-[#8338EC] h-[39px]"
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
