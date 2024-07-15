import PostItem from "components/common/PostItem";
import React from "react";

const Posts = () => {
  return (
    <div className="flex flex-col">
      <div>
        <PostItem title="Post 1" content="Content 1" likes={0} />
        <PostItem title="Post 2" content="Content 2" likes={0} />
      </div>
      <div></div>
    </div>
  );
};

export default Posts;
