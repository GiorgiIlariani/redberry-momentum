import { apiRequest } from "@/lib/actions";

const HomePage = async () => {
  const employees = (await apiRequest("employees", "GET")) || [];

  console.log({ employees });

  return (
    <main className="w-full mt-10">
      <h1 className="text-[#212529] font-semibold text-[34px]">
        დავალებების გვერდი
      </h1>

      {/* Grid with 4 equally sized divs */}
      <div className="grid grid-cols-4 gap-4 mt-[52px]">
        <div className="border py-[15px] text-center bg-[#F7BC30] text-white font-medium text-xl rounded-[10px]">
          დასაწყები
        </div>
        <div className="border py-[15px] text-center bg-[#FB5607] text-white font-medium text-xl rounded-[10px]">
          პროგრესში
        </div>
        <div className="border py-[15px] text-center bg-[#FF006E] text-white font-medium text-xl rounded-[10px]">
          მზად ტესტირებისთვის
        </div>
        <div className="border py-[15px] text-center bg-[#3A86FF] text-white font-medium text-xl rounded-[10px]">
          დასრულებული
        </div>
      </div>
    </main>
  );
};

export default HomePage;
