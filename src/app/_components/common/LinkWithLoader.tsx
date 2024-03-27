import Link from 'next/link'
import React from 'react'

export default function LinkWithLoader({href, content}: {href: string, content: string}) {
  const handleClick = () => {
    
  }
  return (
    <Link href={href} onClick={handleClick}>{content}</Link>
  )
}
