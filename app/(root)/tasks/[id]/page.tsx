import AddComment from "@/components/shared/AddComment";
import CommentCard from "@/components/shared/CommentCard";
import { DepartmentBadge, PriorityBadge } from "@/components/shared/TaskCard";
import StatusUpdater from "@/components/shared/TaskStatusUpdater";
import { apiRequest } from "@/lib/actions";
import { parseDate } from "@/utils";
import Image from "next/image";

const Task = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsId = (await params).id;

  const [details, comments] = await Promise.all([
    apiRequest(`tasks/${paramsId}`, "GET"),
    apiRequest(`tasks/${paramsId}/comments`, "GET"),
  ]);

  const formattedDueDate = parseDate(details.due_date);
  const commentLength = comments.reduce(
    (sum: number, comment: comment) =>
      sum + (comment.sub_comments?.length || 0) + 1,
    0
  );

  return (
    <main className="w-full mt-10 flex gap-[223px] pb-[376px]">
      <div className="max-w-[715px]">
        <div className="flex items-center gap-[10px]">
          <PriorityBadge priority={details.priority.name} />
          <DepartmentBadge departmentName={details.department.name} />
        </div>
        <h1 className="text-[#212529] font-semibold text-[34px]">
          Redberry-ს საიტის ლენდინგის დიზაინი
        </h1>
        <p className="text-[#000000] mt-[26px]">
          მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი...
        </p>

        <div className="max-w-[493px] mt-[63px]">
          <h3 className="text-[#2A2A2A] font-medium">დავალების დეტალები</h3>

          <div className="w-full mt-[18px] flex flex-col">
            {[
              {
                icon: "/assets/status.png",
                label: "სტატუსი",
                content: (
                  <StatusUpdater
                    taskId={paramsId}
                    currentStatus={details.status.name}
                  />
                ),
              },
              {
                icon: "/assets/user.png",
                label: "თანამშრომელი",
                content: (
                  <div className="flex items-end gap-3">
                    <Image
                      src={details.employee.avatar}
                      alt="employee"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] text-[#474747] font-light">
                        {details.department.name}
                      </p>
                      <h4 className="text-sm text-[#0D0F10]">
                        {details.employee.name}
                      </h4>
                    </div>
                  </div>
                ),
              },
              {
                icon: "/assets/calendar.png",
                label: "დავალების ვადა",
                content: formattedDueDate,
              },
            ].map(({ icon, label, content }) => (
              <div
                key={label}
                className="flex items-center gap-[70px] h-[70px]"
              >
                <div className="flex items-center gap-[6px] w-[164px]">
                  <Image src={icon} alt={label} width={24} height={24} />
                  <p className="text-base text-[#474747] font-light">{label}</p>
                </div>
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[741px] h-[975px] bg-[#F8F3FEA6] rounded-[10px] flex flex-col gap-[66px] pt-10 px-[45px]">
        <AddComment taskId={paramsId} />
        <div className="flex flex-col gap-10">
          <div className="flex gap-[7px] items-center">
            <h2 className="text-xl text-[#000000] font-medium">კომენტარები</h2>
            <div className="bg-[#8338EC] text-white px-[11px] py-[2.5px] rounded-[30px]">
              {commentLength}
            </div>
          </div>
          <div className="flex flex-col gap-[38px] max-h-[618px] overflow-y-auto">
            {[...comments].reverse().map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                taskId={paramsId}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Task;
