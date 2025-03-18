import { apiRequest } from "@/lib/actions";
import TaskCard from "@/components/shared/TaskCard";
import { statuses } from "@/constants";
import { FilterMenubar } from "@/components/shared/FilterMenubar";
import { filterTasksByStatus, parseSearchParams } from "@/utils";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    departments?: string;
    priorities?: string;
    employees?: string;
  }>;
}) => {
  const params = await searchParams;
  const [tasks, departments, priorities, employees] = await Promise.all([
    apiRequest("tasks", "GET"),
    apiRequest("departments", "GET"),
    apiRequest("priorities", "GET"),
    apiRequest("employees", "GET"),
  ]);

  const filters = {
    departments: parseSearchParams(params.departments),
    priorities: parseSearchParams(params.priorities),
    employees: parseSearchParams(params.employees),
  };

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        დავალებების გვერდი
      </h1>

      <div className="mt-[52px]">
        <FilterMenubar
          departments={departments}
          priorities={priorities}
          employees={employees}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 pb-[152px]">
        {statuses.map((status) => {
          const filteredTasks = filterTasksByStatus(tasks, status, filters);

          return (
            <div key={status.id}>
              <div
                className="py-[15px] px-2 rounded-[10px] text-white font-medium text-xl text-center"
                style={{ backgroundColor: status.color }}
              >
                {status.name}
              </div>
              <div className="space-y-[30px] mt-[30px]">
                {filteredTasks.map((task) => (
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
