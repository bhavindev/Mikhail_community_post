import React, { useState } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentInput from "./CommentInput";
import { Comment } from "../types/types";
import { FaRegHeart } from "react-icons/fa6";
import { Favorite } from "@mui/icons-material";

interface Props {
  postId: string;
  comment: Comment;
  handleAddReply: (
    postId: string,
    parentCommentId: string,
    text: string,
    author: string
  ) => void;
}

function CommentComponent({ postId, comment, handleAddReply }: Props) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleLikeComment = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{
            color: "#1c1c1c",
            fontWeight: 700,
            fontSize: { xs: "14px", md: "16px", lineHeight: "18px" },
          }}
        >
          {comment.author || "Anonymous"}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setLiked((prev) => !prev)}
            aria-label="like"
            sx={{ color: "#121212d6", fontSize: { xs: "14px", md: "16px" } }}
          >
            {liked ? <Favorite /> : <FaRegHeart />}
          </IconButton>
          <Typography
            onClick={() => setShowReplyInput(!showReplyInput)}
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Reply
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ color: "#121212d6", fontSize: { xs: "14px" } }}>
        {comment.text}
      </Typography>
      <Divider sx={{ marginY: 0.5 }} />

      {comment.replies.map((reply) => (
        <CommentComponent
          key={reply.id}
          postId={postId}
          comment={reply}
          handleAddReply={handleAddReply}
        />
      ))}

      {showReplyInput && (
        <CommentInput
          postId={postId}
          parentCommentId={comment.id}
          onAddComment={(postId, text, author) =>
            handleAddReply(postId, comment.id, text, author)
          }
          showReplyInput={showReplyInput}
          setShowReplyInput={setShowReplyInput}
        />
      )}
    </Box>
  );
}

export default CommentComponent;
