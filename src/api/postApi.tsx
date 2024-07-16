import axios, { AxiosResponse } from "axios";
import { TCreatePost } from "types/post.type";
import {  TCommonResponse } from "types/response.type";
import { createAxiosConfig } from "./apiConfig";

export async function createPost(data: TCreatePost): Promise<AxiosResponse<TCommonResponse> | undefined> {
  try {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const response = await axios.post<TCommonResponse>('http://localhost:8080/api/posts', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
    // Optionally, handle or throw non-Axios errors as well
  }
}

export async function getAllPost(page: number): Promise<AxiosResponse<TCommonResponse> | undefined> {
  try {
      const config = createAxiosConfig();
      // Include the page parameter in the request URL
      const response = await axios.get<TCommonResponse>(`http://localhost:8080/api/posts?page=${page}`, config);

      return response;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          return error.response;
      }
      // Optionally, handle or throw non-Axios errors as well
  }
}

export async function getPostById(id: number): Promise<AxiosResponse<TCommonResponse> | undefined> {
  try {
      const config = createAxiosConfig();
      const response = await axios.get<TCommonResponse>(`http://localhost:8080/api/posts/${id}`, config);

      return response;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          return error.response;
      }
      // Optionally, handle or throw non-Axios errors as well
  }
}