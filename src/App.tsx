import React, { useState } from "react";
import { mockData } from "./utils/mockData";
import { Post, Comment } from "./types/types";
import PostCard from "./components/PostCard";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { PhotoCamera } from "@mui/icons-material";

function App() {
  const [posts, setPosts] = useState<Post[]>(mockData);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const authors = ["Alice", "Bob", "Charlie", "Eve", "Oscar", "Sophia"];

  const handleAddPost = () => {
    if (newPostText.trim() === "") return;

    // Pick a random author from the list
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    setPosts([
      ...posts,
      {
        id: uuidv4(),
        text: newPostText,
        imageUrl: newPostImage,
        comments: [],
        author: randomAuthor,
      },
    ]);
    setNewPostText("");
    setNewPostImage(null);
  };

  const handleAddComment = (postId: string, text: string, author: string) => {
    if (text.trim() === "") return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: uuidv4(), text, author, replies: [] },
              ],
            }
          : post
      )
    );
  };

  const handleAddReply = (
    postId: string,
    parentCommentId: string,
    text: string,
    author: string
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === parentCommentId
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        {
                          id: Date.now().toString(),
                          text,
                          author,
                          replies: [],
                        },
                      ],
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setNewPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="gradient_body">
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            "&.css-5c1adp-MuiContainer-root": {
              padding: 0,
            },
          }}
        >
          <Box sx={{ maxWidth: "md", mx: "auto", mt: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              sx={{ color: "black", fontWeight: "bold" }}
              marginBottom={"20px"}
            >
              Community Page
            </Typography>
            <Card
              sx={{
                maxWidth: { xs: "100%", sm: "90%", md: 1200 },
                padding: "20px",
                margin: "auto",
                boxShadow: 3,
                borderRadius: 3,
                overflow: "hidden",
                color: "white",
                backdropFilter: "blur(10px)",
                position: "relative",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                variant="h6"
                marginBottom={"20px"}
                gutterBottom
                color="#000000cc"
              >
                Create a Post
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  sx={{
                    border: "1px solid #44u",
                    color: "black",
                    width: "100%",
                  }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>

                {newPostImage && (
                  <CardMedia
                    component="img"
                    image={newPostImage}
                    alt="Post Preview"
                    sx={{
                      marginTop: 2,
                      borderRadius: 3,
                      maxHeight: { xs: 200, md: 400 },
                      width: { xs: 200, md: 500 },
                      objectFit: "cover",
                      marginX: "auto",
                      boxShadow: 2,
                    }}
                  />
                )}
              </Box>

              <TextField
                fullWidth
                multiline
                minRows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind?"
                variant="outlined"
                sx={{
                  marginBottom: 2,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Box marginX={"auto"} marginTop={"10px"} width={"50%"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddPost}
                  disabled={!newPostText.trim()}
                  sx={{
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "100%",
                  }}
                >
                  Post
                </Button>
              </Box>
            </Card>
          </Box>

          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginY: "30px",
              }}
            >
              Recent Posts
            </Typography>
            {posts.length === 0 ? (
              <Typography color="text.secondary" textAlign="center">
                No posts available. Create the first post!
              </Typography>
            ) : (
              <>
                {posts.map((post) => (
                  <Box key={post.id} sx={{ marginBottom: 3 }}>
                    <PostCard
                      post={post}
                      handleAddReply={handleAddReply}
                      handleAddComment={handleAddComment}
                    />
                    <Divider sx={{ marginY: 2 }} />
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default App;
