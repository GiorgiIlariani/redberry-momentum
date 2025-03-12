import CreateAssignmentForm from "@/components/forms/CreateAssignmentForm";
import React from "react";

const CreateAssignment = () => {
  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        შექმენი ახალი დავალება
      </h1>

      <CreateAssignmentForm />
    </main>
  );
};

export default CreateAssignment;
