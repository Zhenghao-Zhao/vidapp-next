import useFetchImages from '@/app/hooks/useFetchImages'
import { Photo } from '@/app/types/schema';
import Image from 'next/image';
import React, { memo, useCallback, useRef, useState } from 'react'

export default memo(function ImagePanel() {
  const [pageNum, setPageNum] = useState<number>(1);
  const {isLoading, data, error}: {isLoading: boolean, data: Photo[], error: string} = useFetchImages(pageNum);
  const observer = useRef<IntersectionObserver>();

  const lastImageRef = useCallback((node: HTMLElement | null) => {
    if (isLoading || !node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNum(pageNum => pageNum + 1)
      }
    })
    observer.current.observe(node);
  }, [isLoading])

  const picElements = data.map(
    (p, index) => index+1 === data.length? <BlurImage ref={lastImageRef} key={index} {...p} />:<BlurImage key={index} {...p} />
  )

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      {isLoading && <p>Loading...</p>}
    </div>
  )
})

const BlurImage = React.forwardRef<HTMLAnchorElement, Photo>(function BlurImage(photo: Photo, ref) {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <a ref={ref} href={photo.url} target='_blank'>
      <div 
          className='relative'          
          onMouseOver={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}>
        <div 
          className={`aspect-w-1 aspect-h-1 w-full overflow-hidden ${!showDetails && 'rounded-lg'} duration-700 bg-gray-200 xl:aspect-w-7 xl:aspect-h-8`}
        >
          <Image
            src={photo.src.original}
            alt={photo.alt || ''}
            className={`object-cover ${showDetails && 'scale-105'} duration-700 ease-in-out
                        ${loading? 'grayscale blur-2xl scale-110':'grayscale-0 blur-0 scale-100'}`}
            onLoad={() => setLoading(false)}
            priority={true}
            fill={true}
            placeholder='empty'
          />  
        </div>
        <div 
          className={`text-white duration-700 absolute bottom-0 h-12 w-full ${!showDetails && 'invisible' && 'opacity-0'} 
                        flex items-center justify-center backdrop-blur-xl bg-black bg-opacity-20 `}>
            Created by: {photo.photographer}
        </div>
      </div>
    </a>
  )
})
