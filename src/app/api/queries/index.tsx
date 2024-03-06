import { delay } from "@/app/_utility/helpers";
import axios from "axios";

const BUCKET_URL = process.env.R2_BUCKET_URL
const CUSTOM_AUTH_KEY = process.env.R2_CUSTOM_AUTH_KEY

export const fetchUserPosts = async (pageParam: number) => {
  const res = await fetch(`api/posts?page=${pageParam}`)
  return res.json();
}

export const fetchPostCount = async () => {
  const res = await fetch('api/posts/count')
  return res.json();
}

export function putImage(file: File, filename: string) {
  return fetch(BUCKET_URL + "/" + filename, {
    method: "PUT",
    headers: {
      "X-Custom-Auth-Key": CUSTOM_AUTH_KEY,
    },
    body: file,
  })
}

export function getImage(filename: string) {
  return fetch(BUCKET_URL + "/" + filename, {
    method: "GET",
    headers: {
      "X-Custom-Auth-Key": CUSTOM_AUTH_KEY, 
    },
  })
}

// page: 