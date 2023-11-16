'use client'
import { useCallback, useRef } from 'react'

type Props = {
  title: string;
  src: string | undefined;
  thumbnail?: string | undefined;
}
export default function Video({ title, src, thumbnail }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const onMouseOver = useCallback((): void => {
    imageRef.current!.setAttribute('hidden', '');
    videoRef.current!.removeAttribute('hidden');
    videoRef.current!.setAttribute('controls', '');
    videoRef.current!.play();
  }, [])

  const onMouseLeave = useCallback((): void => {
    videoRef.current!.setAttribute('hidden', '');
    imageRef.current!.removeAttribute('hidden');
    videoRef.current!.removeAttribute('controls');
    videoRef.current!.pause();
  }, [])
  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <img ref={imageRef} src={thumbnail} alt="thumbnail" className="rounded-lg" />
      <video ref={videoRef} muted hidden>
        <source src={src} type='video/mp4'/>
      </video>
      <button className="flex">
          <p>{title}</p>
        </button>
    </div>
  )
}