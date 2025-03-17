import CreateTaskForm from "@/components/forms/CreateTaskForm";
import { apiRequest } from "@/lib/actions";
import React from "react";

const CreateAssignment = async () => {
  const departments = (await apiRequest("departments", "GET")) || [];
  const employees = (await apiRequest("employees", "GET")) || [];

  const statuses = (await apiRequest("statuses", "GET")) || [];
  const priorities = (await apiRequest("priorities", "GET")) || [];

  return (
    <main className="w-full mt-10 max-h-[958px] mb-[386px]">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        შექმენი ახალი დავალება
      </h1>

      <CreateTaskForm
        departments={departments}
        employees={employees}
        statuses={statuses}
        priorities={priorities}
      />
    </main>
  );
};

export default CreateAssignment;
