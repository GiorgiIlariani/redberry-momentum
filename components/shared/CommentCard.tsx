"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddComment from "./AddComment";
import { sub } from "date-fns";

const CommentCard = ({
  comment,
  taskId,
}: {
  comment: comment;
  taskId: string;
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  console.log({ showReplyBox });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <Image
          src={comment.author_avatar}
          alt={comment.author_nickname}
          width={38}
          height={38}
          className="w-[38px] h-[38px] object-cover rounded-full"
        />

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-2">
            <h4 className="text-[#212529] text-lg font-medium">
              {comment.author_nickname}
            </h4>
            <p className="text-[#343A40] text-base">{comment.text}</p>
          </div>
          <div
            className="flex items-center gap-[6px] cursor-pointer"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
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

      {showReplyBox && <AddComment taskId={taskId} parentId={comment.id} />}

      {/* Render sub-comments recursively */}
      {/* {comment.sub_comments?.length > 0 && ( */}
      <div className="ml-10 mt-3 flex flex-col gap-3 pl-3">
        {comment.sub_comments.map((subComment: any) => (
          <div className="flex items-start gap-3" key={subComment.id}>
            <Image
              src={subComment.author_avatar}
              alt={subComment.author_nickname}
              width={38}
              height={38}
              className="w-[38px] h-[38px] object-cover rounded-full"
            />

            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-2">
                <h4 className="text-[#212529] text-lg font-medium">
                  {subComment.author_nickname}
                </h4>
                <p className="text-[#343A40] text-base">{subComment.text}</p>
              </div>
              <div
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => setShowReplyBox(!showReplyBox)}
              >
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
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

export default CommentCard;
