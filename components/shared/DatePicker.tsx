import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  onChange,
  error,
  isDirty,
}: {
  date?: Date;
  onChange: (date?: Date) => void;
  error: boolean;
  isDirty: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-[318px] h-[45px]  border-[#CED4DA] !ring-0 justify-start text-left font-normal !date && "text-muted-foreground ${
            !error ? "border-red-500" : isDirty ? "border-green-500" : ""
          }`}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          className=""
        />
      </PopoverContent>
    </Popover>
  );
}
