import React, { useState, useEffect } from "react";
import PostItem from "components/common/PostItem";
import { getAllPost } from "api/postApi";
import { Post } from "types/response.type"; // Adjust the import path

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize state to hold posts

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPost(); // Call the function to fetch posts
      setPosts(response?.data?.data?.content || []); // Set the posts in state
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          title={post.title}
          content={post.content || ""}
          likes={post.totalLikes}
        />
      ))}
    </div>
  );
};

export default Posts;
