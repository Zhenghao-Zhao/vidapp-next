import { useEffect, useState } from "react";
import { ImageResults, Photo, PhotoResultSchema } from "../_types";
import { PEXELS_API_KEY } from "../_utility/constants";
import usePreloadImages from "./usePreloadImages";

export const IMAGE_COUNT_PER_PAGE = 10;

export default function useFetchImages(pageNum: number = 1) {
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const isReady = usePreloadImages(data, setPhotos);
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/curated?page=${pageNum}&per_page=${IMAGE_COUNT_PER_PAGE}`,
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
        const parsedData = PhotoResultSchema.parse(data);
        setData((prev) => [...prev, ...parsedData.photos]);
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
      }
    })();
    return () => controller.abort();
  }, [pageNum]);

  return { photos, error, isReady };

}
