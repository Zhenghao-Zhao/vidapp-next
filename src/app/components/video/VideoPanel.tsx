import imageArray from '../../assets/static/img/images'
import Image from 'next/image'
import videoArray from '../../assets/static/videos/videos'
import Video from './Video'

export default function VideoPanel() {
  const images = imageArray.map((img) => 
    <Image title={img.title} alt={img.title} src={img.src} key={img.title} />
  )

  const videos = videoArray.map(video => 
    <Video title={video.title} src={video.src} key={video.title} />  
  )
  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {videos}
      {images}
    </div>
  )
}