import React, { useState, useEffect } from "react";
import PostItem from "components/common/PostItem";
import { getAllPost } from "api/postApi";
import { Post } from "types/response.type"; // Adjust the import path

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Assuming your API returns total pages

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      const response = await getAllPost(page); // Modify getAllPost to accept page parameter

      console.log("🚀 ~ fetchPosts ~ response:", response)

      if (response?.data?.data) {
        setPosts(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 0); // Set total pages from response
      }
    };

    fetchPosts(currentPage);
  }, [currentPage]); // Depend on currentPage to refetch when it changes

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content || ""}
          likes={post.totalLikes}
          imageUrl={post.imageUrl || ""}
          author={post.author}
          createdDate={post.createdDate}
        />
      ))}
      <div className="pagination flex items-center gap-3">
        <button
          className={`bg-primary text-white p-2 rounded-lg ${
            currentPage === 0 ? "bg-opacity-10" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className={`bg-primary text-white p-2 rounded-lg ${
            currentPage === totalPages - 1 ? "bg-opacity-10" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
