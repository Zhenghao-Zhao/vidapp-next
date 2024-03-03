'use client'
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import profilePic from '@/app/_assets/static/defaultProfileImage.jpeg'
import ImageLayout from "@/app/_components/images/ImageLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "@/app/api/queries";
import { Post } from "@/app/_schema/schema";

export default function Profle() {
  const [page, setPage] = useState(0);
  const { user } = useAuthContext();
  const pageRef = useRef(0);
  const posts = useQuery({ queryKey: ['posts'], queryFn: () => fetchUserPosts(pageRef.current) })

  const goToNextPage = () => {
    setPage(prev => prev + 1);
  }

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="flex w-full items-center justify-center border-b p-4">
        <div className="w-[150px] h-[150px] shrink-0 relative mx-[150px]">
          <Image src={profilePic} fill={true} alt="Profile image" className="w-full h-full" />
        </div>
        <div className="grow">
          <p className="mb-[20px] text-2xl font-bold">{user?.email}</p>
          <p><span className="mr-2 font-bold">{posts.data?.data.length}</span>posts</p>
        </div>
      </header>
      <div>
        {posts.data && <ImageLayout goToNextPage={goToNextPage} posts={posts.data?.data}/>}
      </div>
    </div>
  );
}
