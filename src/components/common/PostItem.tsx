import ChatBubbleIcon from "components/icons/ChatBubbleIcon";
import ThumbDownIcon from "components/icons/ThumbDownIcon";
import ThumbUpIcon from "components/icons/ThumbUpIcon";
import { ROUTE_POST_DETAILS } from "constants/WebPath";
import useToggleValues from "hooks/useToggleValues";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IPostItemProps } from "types/post.type";

const PostItem: React.FC<IPostItemProps> = ({
  id,
  title,
  content,
  likes: initialLikes,
  imageUrl,
  author,
  createdDate,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const { value: isThumbsUp, handleToggleValue: toggleIsLiked } =
    useToggleValues();
  const { value: isThumbDown, handleToggleValue: toggleIsDisliked } =
    useToggleValues();

  const handleIsLiked = () => {
    if (!isThumbsUp) {
      setLikes((prevLikes) => prevLikes + 1);
      if (isThumbDown) {
        toggleIsDisliked();
        setLikes((prevLikes) => prevLikes + 1); // Revert the dislike decrement
      }
    } else {
      setLikes((prevLikes) => prevLikes - 1);
    }
    toggleIsLiked();
  };

  const handleIsDisliked = () => {
    if (!isThumbDown) {
      setLikes((prevLikes) => prevLikes - 1);
      if (isThumbsUp) {
        toggleIsLiked();
        setLikes((prevLikes) => prevLikes - 1); // Revert the like increment
      }
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    toggleIsDisliked();
  };

  return (
    <div className="p-5 mb-5 rounded-lg shadow-md border w-2/3 flex flex-col">
      <h2 className="font-bold text-2xl mb-1">{title}</h2>
      <h3 className="font-light text-secondary mb-3 text-sm">By: {author}</h3>
      {content ? (
        <p className="font-light text-secondary">{content}</p>
      ) : imageUrl ? (
        <img src={imageUrl} alt={imageUrl} className="w-fit" />
      ) : null}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-2 py-2">
          <button>
            <span>
              <ThumbUpIcon
                isLiked={isThumbsUp}
                onClick={handleIsLiked}
                className="size-5 text-primary"
              />
            </span>
          </button>
          <span>{likes}</span>
          <button>
            <span>
              <ThumbDownIcon
                isDisliked={isThumbDown}
                onClick={handleIsDisliked}
                className="size-5 text-orange-500"
              />
            </span>
          </button>
        </div>
        <div className="px-2 py-[10px] bg-slate-100 rounded-lg flex items-center">
          <NavLink
            to={ROUTE_POST_DETAILS.replace(':id', id.toString())}>
            <span>
              <ChatBubbleIcon className="size-5" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
