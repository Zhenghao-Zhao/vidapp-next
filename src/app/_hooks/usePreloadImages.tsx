import { useEffect, useState } from 'react';
import { getURLs } from '../_components/images/ImagePanel';
import { Photo } from '../_schema';

export function preloadImage(url: string) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  })
}

export function preloadImages(urls: string[]) {
  const promises = urls.map((url) => preloadImage(url))
  return promises;
}

export default function usePreloadImages(photos: Photo[], setPhotos: (photos: Photo[]) => void) {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    setIsReady(false);
    async function effect() {
      const urls = getURLs(photos);
      const promises = urls.map((url) => preloadImage(url))
      await Promise.all(promises);
      setIsReady(true); 
      setPhotos(photos);
    }
    effect();
  }, [photos, setPhotos])
  return isReady;
}
