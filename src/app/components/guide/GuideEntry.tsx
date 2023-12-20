import { twMerge } from 'tailwind-merge'
import { IconType, icons } from "../../assets/Icons"
import IconButton from '../common/buttons/IconButton'

type Props = {
  icon?: IconType,
  title: string,
  url: string,
  className?: string,
  image?: string,
}

export  function GuideEntry({ 
  icon, 
  title, 
  url, 
  className, 
  image
}: Props) {
  return (
    <a target='_blank' href={url} className={twMerge("flex flex-shrink-0 items-center hover:bg-btn-hover px-4 h-10 rounded-lg", className)} title={title}>
      {(icon && <div className="w-6 mr-6">{icons[icon]}</div>) ||
      (image && <div className="w-6 mr-6"><img className='rounded-full' src={image} /></div>)}
      <div className="flex-1 text-left truncate">{title}</div>
    </a>
  )
}


type MiniProps = {
  icon: IconType;
  title: string,
}

export function MiniGuideEntry({ 
  icon, 
  title 
}: MiniProps) {
  return (
    <IconButton className="flex-col w-16 py-4 rounded-lg gap-[6px]" icon={icon} name={title} />
  )
}