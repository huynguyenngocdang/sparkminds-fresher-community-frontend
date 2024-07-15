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
    image_url?: string;
    post_type: EPostType;
}