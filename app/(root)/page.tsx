import { apiRequest } from "@/lib/actions";
import TaskCard from "@/components/shared/TaskCard"; // Adjust the path if needed
import { statuses } from "@/constants";
import { FilterMenubar } from "@/components/shared/FilterMenubar";

const HomePage = async () => {
  const tasks = (await apiRequest("tasks", "GET")) || [];

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        დავალებების გვერდი
      </h1>

      <div className="mt-[52px]">
        <FilterMenubar />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-[79px]">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter(
            (task: any) => task.status.name === status.name
          );

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
