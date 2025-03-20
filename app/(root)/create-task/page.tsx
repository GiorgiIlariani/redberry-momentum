import CreateTaskForm from "@/components/forms/CreateTaskForm";
import { apiRequest } from "@/lib/actions";

const CreateAssignment = async () => {
  const [departments, employees, statuses, priorities] = await Promise.all([
    apiRequest("departments", "GET"),
    apiRequest("employees", "GET"),
    apiRequest("statuses", "GET"),
    apiRequest("priorities", "GET"),
  ]);

  return (
    <main className="w-full mt-10 max-h-[958px] mb-[386px]">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        შექმენი ახალი დავალება
      </h1>

      <CreateTaskForm
        departments={departments || []}
        employees={employees || []}
        statuses={statuses || []}
        priorities={priorities || []}
      />
    </main>
  );
};

export default CreateAssignment;
