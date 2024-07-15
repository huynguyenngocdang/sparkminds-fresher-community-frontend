import { Control } from "react-hook-form";

export type TInputFormProps = {
  control: Control<any>;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
};

export type TSignInProps = {
  username: string;
  password: string;
};

export type TSignUpProps = {
  username: string;
  password: string;
};

export type TResponse<T> = {
  message: string | null;
  status: string;
  data: T | null;
  error: string | null;
}
export type LoginResponseData = {
  accessToken?: string;
  username?: string;
  userId?: string;
  roles?: Array<{role: string}>;
}


export type TLoginResponse = TResponse<LoginResponseData>;
export type TRegisterResponse = TResponse<any>;

export interface IFormButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export interface ILabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export interface IEyeIconToggleProps {
  open?: boolean;
  onClick?: () => void;
}

export type ClassValue = string | { [key: string]: boolean };
