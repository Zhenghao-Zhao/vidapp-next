import axios from "axios";

const BUCKET_URL = process.env.R2_BUCKET_URL
const CUSTOM_AUTH_KEY = process.env.R2_CUSTOM_AUTH_KEY

export function fetchUserPosts(page=0) {

  return axios.get(`api/posts?page=${page}`)
}

export function putImage(file: File, filename: string) {
  console.log(filename)
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