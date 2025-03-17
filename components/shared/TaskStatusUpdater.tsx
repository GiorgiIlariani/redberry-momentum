"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/actions";
import { statuses } from "@/constants";

const StatusUpdater = ({
  taskId,
  currentStatus,
}: {
  taskId: string;
  currentStatus: string;
}) => {
  const [selectedId, setSelectedId] = useState(
    statuses.find((s) => s.name === currentStatus)?.id || ""
  );

  const handleStatusChange = async (newStatusId: string) => {
    const selectedStatus = statuses.find((s) => s.id === Number(newStatusId));
    if (!selectedStatus) return;

    setSelectedId(newStatusId);

    try {
      await apiRequest(`tasks/${taskId}`, "PUT", {
        status_id: Number(newStatusId),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Select onValueChange={handleStatusChange} value={String(selectedId)}>
      <SelectTrigger className="h-[45px] w-[259px]">
        <SelectValue placeholder="აირჩიეთ სტატუსი" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusUpdater;
