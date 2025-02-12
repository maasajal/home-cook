import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export { axiosPublic, useAxiosPublic };
