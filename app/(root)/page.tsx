import { apiRequest } from "@/lib/actions";

const HomePage = async () => {
  const statuses = (await apiRequest("statuses", "GET")) || [];
  const priorities = (await apiRequest("priorities", "GET")) || [];
  const departments = (await apiRequest("departments", "GET")) || [];
  const employees = (await apiRequest("employees", "GET")) || [];
  const taskComments = (await apiRequest("tasks/1/comments", "GET")) || [];
  const allTasks = (await apiRequest("tasks", "GET")) || [];

  console.log({
    statuses: statuses.length,
    priorities: priorities.length,
    departments: departments.length,
    employees: employees.length,
    taskComments,
    allTasks,
  });

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        დავალებების გვერდი
      </h1>
    </main>
  );
};

export default HomePage;
