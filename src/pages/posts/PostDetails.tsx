import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import { getPostById } from "api/postApi";
import { Post } from "types/response.type";
import PostDetailsItem from "components/common/PostDetailsItem";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>(); // Assuming `id` is a string parameter; adjust if necessary
  const [post, setPost] = useState<Post>(); // Adjust TCommonResponse to match your data type

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const response = await getPostById(Number(id));
        if (response?.data?.data) {
          setPost(response.data.data);
          console.log(
            "🚀 ~ fetchPost ~ response.data.data:",
            response.data.data
          );
        }
      }
    };
    fetchPost();
  }, [id]); // This effect depends on `id` and will re-run if `id` changes

  return (
    <MainLayout>
      {post ? (
        <div>
          <PostDetailsItem 
                    id={post.id}
                    title={post.title}
                    content={post.content || ""}
                    totalLikes={post.totalLikes}
                    imageUrl={post.imageUrl || ""}
                    author={post.author}
                    createdDate={post.createdDate}
                    like={post.like}
                    dislike={post.dislike}
                    isDelete={post.isDelete} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </MainLayout>
  );
};

export default PostDetails;
