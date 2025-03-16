"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest, addComment, addSubComment } from "@/lib/actions";

export default function AddComment({
  taskId,
  parentId,
}: {
  taskId: string;
  parentId?: number;
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      if (!parentId) {
        const response = await addComment(taskId, comment);
      }
      if (parentId) await addSubComment(taskId, comment, parentId);
      setComment(""); // Clear input after adding comment
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[135px] flex flex-col gap-3 w-full bg-white p-4 rounded-xl">
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="დაწერე კომენტარი"
        className="pl-5 pt-[18px] border-none rounded-lg 
                   focus:outline-none focus:ring-0 focus:border-none 
                   focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none shadow-none"
      />
      <Button
        onClick={handleAddComment}
        disabled={loading}
        className="self-end px-4 py-2 text-white bg-[#8338EC] hover:bg-[#8338EC] rounded-[20px] cursor-pointer"
      >
        {loading ? "Loading..." : "დააკომენტარე"}
      </Button>
    </div>
  );
}
