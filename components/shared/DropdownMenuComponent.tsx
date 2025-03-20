import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenuComponent = ({ employees }: { employees: employee[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`w-full h-[40px] p-[10px] rounded-md flex justify-between items-center border border-[#808A93] outline-none 
       
      }`}
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-[385px]">
        {employees.map((employee) => (
          <DropdownMenuItem
            key={employee.id}
            className="bg-white text-sm font-normal cursor-pointer"
          >
            {employee.name} {employee.surname}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
