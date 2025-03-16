import { apiRequest } from "@/lib/actions";
import TaskCard from "@/components/shared/TaskCard"; // Adjust the path if needed
import { statuses } from "@/constants";
import { FilterMenubar } from "@/components/shared/FilterMenubar";

const HomePage = async ({
  searchParams,
}: {
  searchParams: {
    departments?: string;
    priorities?: string;
    employees?: string;
  };
}) => {
  const tasks = (await apiRequest("tasks", "GET")) || [];
  const departments = (await apiRequest("departments", "GET")) || [];
  const priority = (await apiRequest("priorities", "GET")) || [];
  const employees = (await apiRequest("employees", "GET")) || [];

  // Convert query parameters into arrays for filtering
  const selectedDepartments = searchParams.departments
    ? searchParams.departments.split(",").map(Number)
    : [];
  const selectedPriorities = searchParams.priorities
    ? searchParams.priorities.split(",").map(Number)
    : [];
  const selectedEmployees = searchParams.employees
    ? searchParams.employees.split(",").map(Number)
    : [];

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        დავალებების გვერდი
      </h1>

      <div className="mt-[52px]">
        <FilterMenubar
          departments={departments}
          priorities={priority}
          employees={employees}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-[79px]">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter((task: any) => {
            const taskDepartment = task.department?.id;
            const taskPriority = task.priority?.id;
            const taskEmployee = task.employee?.id;

            return (
              (selectedDepartments.length === 0 ||
                selectedDepartments.includes(taskDepartment)) &&
              (selectedPriorities.length === 0 ||
                selectedPriorities.includes(taskPriority)) &&
              (selectedEmployees.length === 0 ||
                selectedEmployees.includes(taskEmployee)) &&
              task.status.name === status.name
            );
          });

          return (
            <div key={status.id}>
              <div
                className={`py-[15px] px-2 rounded-[10px] text-white font-medium text-xl text-center`}
                style={{
                  backgroundColor: status.color,
                }}
              >
                {status.name}
              </div>
              <div className="p-2 space-y-[30px] mt-[30px]">
                {filteredTasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    statusColor={status.color}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
