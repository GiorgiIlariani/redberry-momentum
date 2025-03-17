import { departmentColors, departmentShortNames } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: { name: string };
  department: { id: number; name: string };
  employee: { name: string; avatar: string };
  total_comments: number;
}

interface TaskCardProps {
  task: Task;
  statusColor: string;
}

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityImage =
    priority === "საშუალო" ? "Medium" : priority === "დაბალი" ? "Low" : "High";

  const priorityColor =
    priority === "საშუალო"
      ? "#FFBE0B"
      : priority === "დაბალი"
      ? "#08A508"
      : "#FA4D4D";

  return (
    <div
      className="p-1 border flex items-center gap-1 rounded-[4px]"
      style={{ borderColor: priorityColor }}
    >
      <Image
        src={`/assets/${priorityImage}.png`}
        alt={priority}
        width={16}
        height={16}
        className="w-[16px] h-[16px] object-contain"
      />
      <p className="text-xs font-medium" style={{ color: priorityColor }}>
        {priority}
      </p>
    </div>
  );
};

interface DepartmentBadgeProps {
  departmentName: string;
}

export const DepartmentBadge: React.FC<DepartmentBadgeProps> = ({
  departmentName,
}) => {
  const shortName = departmentShortNames[departmentName];
  const bgColor = departmentColors[departmentName];

  return (
    <div
      className="text-center py-[5px] px-[9px] rounded-[15px] text-white text-xs"
      style={{ backgroundColor: bgColor }}
    >
      {shortName}
    </div>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({ task, statusColor }) => {
  const formattedDueDate = new Date(task.due_date).toLocaleDateString();
  const truncatedDescription =
    task.description.length > 100
      ? `${task.description.substring(0, 100)}...`
      : task.description;

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="bg-white p-5 rounded-[15px] flex flex-col gap-[28px] border"
      style={{ borderColor: statusColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <PriorityBadge priority={task.priority.name} />
          <DepartmentBadge departmentName={task.department.name} />
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
          <span className="text-sm text-[#212529]">{task.total_comments}</span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
