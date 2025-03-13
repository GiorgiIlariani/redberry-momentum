import AddComment from "@/components/shared/AddComment";
import StatusUpdater from "@/components/shared/TaskStatusUpdater";
import { georgianWeekdays } from "@/constants";
import { apiRequest } from "@/lib/actions";
import Image from "next/image";

const Task = async ({ params }: { params: { id: string } }) => {
  const details: Task =
    (await apiRequest(`tasks/${params.id}`, "GET")) || ({} as Task);

  const comments: comment = await apiRequest(
    `tasks/${params.id}/comments`,
    "GET"
  );

  const priority = details.priority.name;

  const dueDate = new Date(details.due_date);
  const dayOfWeek = georgianWeekdays[dueDate.getDay()];
  const formattedDueDate = `${dayOfWeek} - ${dueDate.toLocaleDateString()}`;

  console.log({ comments });

  return (
    <main className="w-full mt-10 flex gap-[223px]">
      <div className="max-w-[715px]">
        <div className="flex items-center gap-[10px]">
          <div
            className="w-[86px] p-1 border  flex items-center gap-1 rounded-[4px]"
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
            დიზაინი
          </div>
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
              {comments.length}
            </div>
          </div>

          <div className="flex flex-col gap-[38px]">
            {comments.map((comment) => {
              return (
                <div className="flex items-start gap-3" key={comment.id}>
                  <Image
                    src={comment.author_avatar}
                    alt={comment.author_nickname}
                    width={38}
                    height={38}
                    className="w-[38px] h-[38px] object-cover rounded-full"
                  />

                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[#212529] text-lg text-medium">
                        {comment.author_nickname}
                      </h4>
                      <p className="text-[#343A40] text-base">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-[6px] cursor-pointer">
                      <Image
                        src="/assets/answer.png"
                        alt="answer"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />

                      <span className="text-xs text-[#8338EC]">უპასუხე</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Task;
