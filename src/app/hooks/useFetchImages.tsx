import { Photo } from 'pexels';
import { useEffect, useState } from 'react'
import { PEXEL_API_KEY } from '../constants';

const COUNT_PER_PAGE = 20;

export default function useFetchImages(pageNum: number=1) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    async function getCuratedPictures() {
      try { 
        const response = await fetch(`https://api.pexels.com/v1/curated?page=${pageNum}&per_page=${COUNT_PER_PAGE}`, {
          headers: {
            Authorization: PEXEL_API_KEY
          },
          signal: signal
        })

        if (!response.ok) {
          throw new Error("Failed to retrieve images")
        }
        const data = await response.json();
        console.log(data);
        setData(prev => [...prev, ...data.photos]);
        setIsLoading(false);
      } catch(error) {
        console.log(error);
        setError((error as Error).message);
      }
    }
    getCuratedPictures()
    setIsLoading(false);

    return () => controller.abort();
  }, [pageNum])

  return {isLoading, data, error}
}
