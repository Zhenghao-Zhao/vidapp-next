import useFetchImages, { COUNT_PER_PAGE } from '@/app/hooks/useFetchImages'
import { Photo } from '@/app/types/schema';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { BlurImage } from './BlurImage';
import { ImageLoader } from '../loaders';

export default memo(function ImagePanel() {
  const [pageNum, setPageNum] = useState(1);
  const {isLoading, data}: {isLoading: boolean, data: Photo[]} = useFetchImages(pageNum);
  const observer = useRef<IntersectionObserver>();

  const loaders = useMemo(() => {
    const items = Array.from({ length: COUNT_PER_PAGE}).map((_, index) => (
      <ImageLoader key={index} />
    ))
    return items;
  }, [])

  const lastImageRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNum(pageNum => pageNum + 1)
      }
    })
    observer.current.observe(node);
  }, [])

  const picElements = data.map(
    (p, index) => index+1 === data.length? 
    <BlurImage ref={lastImageRef} key={index} {...p} />
    :
    <BlurImage key={index} {...p} />
  )

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      {isLoading && loaders}
    </div>
  )
})
