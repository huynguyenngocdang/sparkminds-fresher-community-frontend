import { EPostType } from "./enums";

export interface IPostItemProps {
    title: string;
    content: string;
    likes: number;
  }

  
export interface ILikeToggleProps {
    isLiked?: boolean;
    onClick?: () => void;
}

export interface IDislikeToggleProps {
    isDisliked?: boolean;
    onClick?: () => void;
}

export type TCreatePost = {
    title: string;
    content?: string;
    imageUrl?: string;
    postType: EPostType;
}
