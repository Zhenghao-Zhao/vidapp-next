import { useEffect, useState } from "react";
import { ImageResults, Photo, ImageResultSchema } from "../_types/schema";
import { PEXELS_API_KEY } from "../constants";
import { delay } from "../_utility/helpers";

export const COUNT_PER_PAGE = 20;

export default function useFetchImages(pageNum: number = 1) {
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/curated?page=${pageNum}&per_page=${COUNT_PER_PAGE}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
            signal: signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve images");
        }
        const data: ImageResults = await response.json();
        const parsedData = ImageResultSchema.parse(data);
        setData((prev) => [...prev, ...parsedData.photos]);
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
      }
    })();
    return () => controller.abort();
  }, [pageNum]);

  return { data, error };
}
