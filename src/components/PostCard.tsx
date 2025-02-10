import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardMedia,
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
  Avatar,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Favorite, Share } from "@mui/icons-material";
import { Post } from "../types/types";
import CommentComponent from "./CommentComponent";
import { FaRegHeart } from "react-icons/fa6";

interface Props {
  post: Post;
  handleAddReply: (
    postId: string,
    commentId: string,
    text: string,
    author: string
  ) => void;
  handleAddComment: (postId: string, text: string, author: string) => void;
}

function PostCard({ post, handleAddReply, handleAddComment }: Props) {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [follow, setFollow] = useState(false);
  const authors = ["Alice", "Bob", "Charlie", "David"];
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleImageClick = () => {
    if (post.imageUrl) {
      setOpenImageModal(true);
    }
  };

  const handleCloseModal = () => setOpenImageModal(false);

  const handleLikePost = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      handleAddComment(post.id, commentText, randomAuthor);
      setCommentText("");
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        overflow: "hidden",
        maxWidth: { xs: "100%", sm: "90%", md: 1000 },
        height: { xs: "auto", md: "550px" },
        boxShadow: 3,
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        position: "relative",
        display: "flex",
        backgroundColor: "rgba(255,255,255,0.1)",
        flexDirection: { xs: "column", md: "row" },
        marginX: "auto",
        marginY: "25px",
      }}
    >
      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt={post.text || "Post content"}
          sx={{
            width: { xs: "100%", md: 550 },
            height: { xs: "250px", md: "550px" },
            objectFit: "cover",
          }}
          onClick={handleImageClick}
        />
      )}

      <CardContent
        sx={{
          width: { md: 450 },
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Avatar src="https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG90cmFpdCUyMGltYWdlfGVufDB8fDB8fHww" />
              <Typography
                gutterBottom
                sx={{
                  fontSize: { xs: "14px", md: "16px", lineHeight: "18px" },
                  color: "black",
                  fontWeight: 600,
                }}
              >
                {post.text}
              </Typography>
            </Box>
            <Button
              onClick={() => setFollow((prev) => !prev)}
              variant="contained"
              sx={{
                bgcolor: "#346ae4",
                fontSize: "0.7rem",
                px: 2,
                textTransform: "capitalize",
              }}
            >
              {follow ? "unfollow" : "follow"}
            </Button>
            {/* <IconButton
              onClick={handleLikePost}
              color={liked ? "primary" : "default"}
            >
              <ThumbUpIcon />
              <Typography sx={{ ml: 1 }}>{likeCount}</Typography>
            </IconButton> */}
          </Box>
          <Typography variant="body1" my={1}>
            Hi 👋😋 The passage experienced a surge in popularity during the
            1960s 😜 when Leeriest used it on their dry-transfer sheets,{" "}
            {expanded ? (
              <>
                and again during the 90s 👋😆 as desktop publishers bundled 😜
                the text with their software.
              </>
            ) : (
              "..."
            )}
          </Typography>
          <Button
            onClick={toggleExpand}
            size="small"
            sx={{ textTransform: "none", color: "#1976d2" }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
          <CardActions disableSpacing sx={{ justifyContent: "start" }}>
            <IconButton
              onClick={() => setLiked((prev) => !prev)}
              aria-label="like"
              sx={{ color: "#121212d6", fontSize: { xs: "20px" } }}
            >
              {liked ? <Favorite /> : <FaRegHeart />}
            </IconButton>

            <IconButton
              aria-label="share"
              sx={{ color: "#121212d6", fontSize: { xs: "17px" } }}
            >
              <Share />
            </IconButton>
          </CardActions>
          <Divider sx={{ marginY: 0.5 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div className="custom_scroll">
              <Box height={"220px"} sx={{ overflowY: "auto" }}>
                {post.comments.map((comment) => (
                  <Box key={comment.id} sx={{ pl: 2 }}>
                    <CommentComponent
                      postId={post.id}
                      comment={comment}
                      handleAddReply={handleAddReply}
                    />
                  </Box>
                ))}
              </Box>
            </div>

            <Box sx={{ display: "flex", flexGrow: "1", gap: 2, marginTop: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
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
                onClick={handleCommentSubmit}
                sx={{
                  bgcolor: "#346ae4",
                  fontSize: "0.9rem",
                  px: 2,
                  textTransform: "capitalize",
                }}
              >
                Comment
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Modal open={openImageModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box sx={{ position: "relative", maxWidth: "80%", maxHeight: "80%" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "gray",
                zIndex: 10,
              }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={post.imageUrl || ""}
              alt={post.text || "Expanded post content"}
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}

export default PostCard;
