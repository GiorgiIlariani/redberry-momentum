"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/actions";

export default function AddComment({ taskId }: { taskId: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (value.length < 2) return alert("Comment must be at least 2 characters");

    setLoading(true);
    const response = await apiRequest(`tasks/${taskId}/comments`, "POST", {
      text: value,
      //   parent_id: 1,
    });

    if (response) {
      setValue(""); // Clear the textarea on success
    } else {
      console.log("Failed to submit comment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-xl">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="დაწერე კომენტარი"
        className="min-h-[135px] pl-5 pt-[18px] border-none rounded-lg 
                   focus:outline-none focus:ring-0 focus:border-none 
                   focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none shadow-none"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="self-end px-4 py-2 text-white bg-[#8338EC] hover:bg-[#8338EC] rounded-[20px] cursor-pointer"
      >
        {loading ? "Loading..." : "დააკომენტარე"}
      </Button>
    </div>
  );
}
