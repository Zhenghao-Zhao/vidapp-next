import { twMerge } from 'tailwind-merge'
import Icon from '@/app/components/common/Icon';
import { IconType } from '@/app/assets/Icons';
import Link from 'next/link';

type Props = {
  icon: IconType;
  name?: string;
  className?: string;
  url?: string;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function IconButton({ icon, className, name, url="", handleClick, handleMouseEnter, handleMouseLeave }: Props) {
  return (    
    url.length > 0?
    <Link href={url} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={twMerge(`flex flex-shrink-0 items-center hover:bg-btn-hover p-2 ${!name && "rounded-full"}`, className)}>
      {<Icon icon={icon} />}
      {name && <p>{name}</p>}
    </Link> :
    <button onClick={ handleClick } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={twMerge(`flex flex-shrink-0 items-center hover:bg-btn-hover p-2 ${!name && "rounded-full"}`, className)}>
      {<Icon icon={icon} />}
      {name && <p>{name}</p>}
    </button>  
  );
}