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