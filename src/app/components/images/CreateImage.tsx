import { IconType, icons } from '@/app/assets/Icons'
import React, { useRef, useState } from 'react'

export default function CreateImage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = () => {
    if (!formRef.current) return
    formRef.current.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    if (!inputRef.current || !inputRef.current.files) return

    e.preventDefault();
    const formData = new FormData();
    formData.append('file', inputRef.current.files[0])
    const res = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json();
    console.log(res, data);
  }

  return (
    <div className='w-[1200px] h-[800px] bg-white rounded-lg'>
      <div className='h-[50px] border-b border-black flex items-center justify-center'>
        <p className='text-lg font-bold'>Create a new post</p>
      </div>
      <div className='flex items-center justify-center flex-col gap-2 h-[750px]'>
        <div className='w-20 '>{icons[IconType.DragAndDrop]}</div>
        <p className='text-xl my-1'>Drag photos and videos here</p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="upload" className='bg-blue-500 p-2 text-white rounded-md'>Select from computer</label>
          <input ref={inputRef} accept='image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime' id='upload' type='file' onChange={handleChange} hidden />
        </form>
      </div>
    </div>
  )
}
