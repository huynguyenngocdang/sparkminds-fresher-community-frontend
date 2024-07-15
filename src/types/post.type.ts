export interface IPostItemProps {
    title: string;
    content: React.ReactNode;
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