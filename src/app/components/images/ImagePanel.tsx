import useFetchImages from '@/app/hooks/useFetchImages'
import Image from 'next/image';
import { Photo } from 'pexels';
import React, { memo, useEffect } from 'react'

export default memo(function ImagePanel() {
  const {isLoading, data, error} = useFetchImages();
  const pictures = data && data.photos.map(p => <Picture key={p.id} photo={p} />)

  return isLoading? <p>Loading...</p> : (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {pictures}
    </div>
  )
})


function Picture({ photo }: {photo: Photo}) {

  return <Image src={photo.src.original} alt={photo.alt || ''} width={500} height={500} className='rounded-lg' />
}
