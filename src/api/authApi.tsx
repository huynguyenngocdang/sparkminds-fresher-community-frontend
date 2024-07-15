import axios, { AxiosResponse } from "axios";
import { TLoginResponse, TRegisterResponse, TSignInProps } from "types";

export async function login(
  data: TSignInProps
): Promise<AxiosResponse<TLoginResponse> | undefined> {
  try {
    const response: AxiosResponse<TLoginResponse> = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        username: data.username,
        password: data.password,
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
}

export async function register(
    data: TSignInProps
    ): Promise<AxiosResponse<TRegisterResponse> | undefined> {
    try {
        const response: AxiosResponse<TRegisterResponse> = await axios.post(
        "http://localhost:8080/api/users/register",
        {
            username: data.username,
            password: data.password,
        }
        );
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        return error.response;
        }
    }
    }