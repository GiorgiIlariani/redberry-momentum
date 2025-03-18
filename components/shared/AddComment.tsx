"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addComment, addSubComment } from "@/lib/actions";

export default function AddComment({
  taskId,
  parentId,
}: {
  taskId: string;
  parentId?: number;
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = async () => {
    if (!comment.trim()) {
      setError("კომენტარი არ შეიძლება იყოს ცარიელი");
      return;
    }
    setError("");
    setLoading(true);
    try {
      parentId
        ? await addSubComment(taskId, comment, parentId)
        : await addComment(taskId, comment);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[135px] flex flex-col gap-3 w-full bg-white p-4 rounded-xl ${
        error && "border border-[#FA4D4D]"
      }`}
    >
      <Textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          if (error) setError(""); // Clear error when user starts typing
        }}
        placeholder="დაწერე კომენტარი"
        className="pl-5 pt-[18px] !border-none !shadow-none !ring-0 !focus:ring-0 !focus-visible:ring-0 !outline-none"
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
