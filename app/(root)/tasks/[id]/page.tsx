import AddComment from "@/components/shared/AddComment";
import CommentCard from "@/components/shared/CommentCard";
import { DepartmentBadge, PriorityBadge } from "@/components/shared/TaskCard";
import StatusUpdater from "@/components/shared/TaskStatusUpdater";
import { georgianWeekdays } from "@/constants";
import { apiRequest } from "@/lib/actions";
import Image from "next/image";

const Task = async ({ params }: { params: { id: string } }) => {
  const paramsId = await params.id;

  const details: Task =
    (await apiRequest(`tasks/${paramsId}`, "GET")) || ({} as Task);

  const comments: comment[] = await apiRequest(
    `tasks/${params.id}/comments`,
    "GET"
  );
  const reversedComments = [...comments].reverse();

  // const sortedComments = comments.sort(
  //   (a, b) =>
  //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  // );

  const priority = details.priority.name;

  const dueDate = new Date(details.due_date);
  const dayOfWeek = georgianWeekdays[dueDate.getDay()];
  const formattedDueDate = `${dayOfWeek} - ${dueDate.toLocaleDateString()}`;

  const commentLength = comments.reduce(
    (sum, comment) => sum + comment.sub_comments.length + 1,
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
          მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი,
          რომელიც უზრუნველყოფს მარტივ ნავიგაციას და მკაფიო ინფორმაციის
          გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive), გამორჩეული
          ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
        </p>

        <div className="max-w-[493px] mt-[63px]">
          <h3 className="text-[#2A2A2A] font-medium">დავალების დეტალები</h3>

          <div className="w-full mt-[18px] flex flex-col">
            <div className="flex items-center gap-[70px] h-[70px]">
              <div className="flex items-center gap-[6px] w-[164px]">
                <Image
                  src="/assets/status.png"
                  alt="status"
                  width={24}
                  height={24}
                />
                <p className="text-base text-[#474747]">სტატუსი</p>
              </div>

              {/* <div className="max-w-[259px]"> */}
              <StatusUpdater
                taskId={params.id}
                currentStatus={details.status.name}
              />
              {/* </div> */}
            </div>
            <div className="flex items-center gap-[70px] h-[70px]">
              <div className="flex items-center gap-[6px]">
                <Image
                  src="/assets/user.png"
                  alt="status"
                  width={24}
                  height={24}
                />
                <p className="text-base text-[#474747]">თანამშრომელი</p>
              </div>
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
            </div>
            <div className="flex items-center gap-[70px] h-[70px]">
              <div className="flex items-center gap-[6px]">
                <Image
                  src="/assets/calendar.png"
                  alt="status"
                  width={24}
                  height={24}
                />
                <p className="text-base text-[#474747]">დავალების ვადა</p>
              </div>
              <div className="flex items-end gap-3">{formattedDueDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[741px] h-[975px] bg-[#F8F3FEA6] rounded-[10px] flex flex-col gap-[66px] pt-10 px-[45px]">
        <AddComment taskId={params.id} />

        <div className="flex flex-col gap-10">
          <div className="flex gap-[7px] items-center">
            <h2 className="text-xl text-[#000000] font-medium">კომენტარები</h2>
            <div className="bg-[#8338EC] text-white px-[11px] py-[2.5px] rounded-[30px]">
              {commentLength}
            </div>
          </div>

          <div className="flex flex-col gap-[38px] max-h-[618px] overflow-y-auto scrollbar-hide">
            {reversedComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                taskId={params.id}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Task;
