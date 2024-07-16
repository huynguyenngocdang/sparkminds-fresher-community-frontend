import { EPostType } from "./enums";

export interface IPostItemProps {
    id: number;
    title: string;
    content: string;
    likes: number;
    imageUrl: string | null;
    author: string;
    createdDate: string;
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
