import { ENV } from "../../env";

export async function uploadCloudImage(filename: string, file: File) {
  return fetch(ENV.R2_BUCKET_URL + "/" + filename, {
    method: "PUT",
    headers: {
      "X-Custom-Auth-Key": ENV.R2_CUSTOM_AUTH_KEY,
    },
    body: file,
  });
}

export async function deleteCloudImage(filename: string) {
  return fetch(ENV.R2_BUCKET_URL + "/" + filename, {
    method: "DELETE",
    headers: {
      "X-Custom-Auth-Key": ENV.R2_CUSTOM_AUTH_KEY,
    },
  }); 
}

export const STATUS_MESSAGES = new Map<number, string>([
  [200, "Successful"],
  [401, "Unauthorized"],
  [403, "Forbidden"],
  [500, "Internal Server Error"],
])