import CreateAssignmentForm from "@/components/forms/CreateAssignmentForm";
import { apiRequest } from "@/lib/actions";
import React from "react";

const CreateAssignment = async () => {
  const departments = (await apiRequest("departments", "GET")) || [];
  const employees = (await apiRequest("employees", "GET")) || [];

  const statuses = (await apiRequest("statuses", "GET")) || [];
  const priorities = (await apiRequest("priorities", "GET")) || [];

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        შექმენი ახალი დავალება
      </h1>

      <CreateAssignmentForm
        departments={departments}
        employees={employees}
        statuses={statuses}
        priorities={priorities}
      />
    </main>
  );
};

export default CreateAssignment;
