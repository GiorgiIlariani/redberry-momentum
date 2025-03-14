import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TaskCardProps {
  task: Task;
  statusColor: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, statusColor }) => {
  const formattedDueDate = new Date(task.due_date).toLocaleDateString();
  const truncatedDescription =
    task.description.length > 100
      ? `${task.description.substring(0, 100)}...`
      : task.description;

  const priority: PriorityName = task.priority.name as PriorityName;

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="bg-white p-5 rounded-[15px] flex flex-col gap-[28px] border"
      style={{ borderColor: statusColor }} // inline style for dynamic border color
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div
            className="p-1 border  flex items-center gap-1 rounded-[4px]"
            style={{
              borderColor:
                priority === "საშუალო"
                  ? "#FFBE0B"
                  : priority === "დაბალი"
                  ? "#FA4D4D"
                  : "#08A508",
            }}
          >
            <Image
              src="/assets/Medium.png"
              alt="medium"
              width={16}
              height={16}
              className="w-[16px] h-[16px] object-contain"
            />
            <p
              className="text-xs  font-medium"
              style={{
                color:
                  priority === "საშუალო"
                    ? "#FFBE0B"
                    : priority === "დაბალი"
                    ? "#FA4D4D"
                    : "#08A508",
              }}
            >
              {priority}
            </p>
          </div>
          <div className="w-[88px] text-center py-[5px] px-[9px] rounded-[15px] bg-[#FF66A8] text-white text-xs">
            {/* {task.department.name} */}
            დიზაინი
          </div>
        </div>
        <span className="text-[12px] text-[#212529]">{formattedDueDate}</span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[15px] font-medium text-[#212529]">{task.name}</h3>
        <p className="text-sm text-[#343A40]">{truncatedDescription}</p>
      </div>

      <div className="flex items-center justify-between">
        <Image
          src={task.employee.avatar}
          alt={task.employee.name}
          width={31}
          height={31}
          className="w-[31px] h-[31px] rounded-full object-cover"
        />

        <div className="flex items-center gap-1">
          <Image
            src="/assets/Comments.png"
            alt="comments"
            width={22}
            height={22}
            className="w-[22px] h-[22px] object-cover"
          />
          <span className="text-sm tetx-[#212529]">{task.total_comments}</span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
