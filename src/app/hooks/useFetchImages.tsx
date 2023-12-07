import { Photo, Photos, createClient } from 'pexels';
import React, { useEffect, useState } from 'react'
import { PEXEL_API_KEY } from '../constants';

const client = createClient(PEXEL_API_KEY);


export default function useFetchImages(pageCount: number=10) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Photos | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    async function getCuratedPictures() {
      try { 
        const response = await client.photos.curated({ per_page: pageCount });
        if ('error' in response) {
          throw new Error("Failed to retrieve images")
        }
        setData(response);
        setIsLoading(false);
      } catch(error) {
        console.log(error);
        setError((error as Error).message);
      }
    }
    getCuratedPictures()
    setIsLoading(false);
  }, [pageCount])

  return {isLoading, data, error}
}
