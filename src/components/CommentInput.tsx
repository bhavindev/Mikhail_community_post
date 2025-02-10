import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface Props {
  postId: string;
  parentCommentId?: string;
  onAddComment: (
    postId: string,
    text: string,
    author: string,
    parentCommentId?: string
  ) => void;
  showReplyInput: boolean;
  setShowReplyInput: (value: boolean) => void;
}

function CommentInput({
  postId,
  parentCommentId,
  onAddComment,
  setShowReplyInput,
  showReplyInput,
}: Props) {
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={
          parentCommentId ? "Write a reply..." : "Write a comment..."
        }
        variant="outlined"
        sx={{
          padding: 0,
          "& .MuiOutlinedInput-root": {
            padding: "5px",
          },
          "& .MuiInputBase-input": {
            padding: "5px",
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (commentText.trim()) {
            onAddComment(postId, commentText, authorName, parentCommentId);
            setCommentText("");
            setAuthorName("");
            setShowReplyInput(!showReplyInput);
          }
        }}
        disabled={!commentText.trim()}
      >
        {parentCommentId ? "Reply" : "Comment"}
      </Button>
    </Box>
  );
}

export default CommentInput;
