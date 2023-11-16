import { twMerge } from 'tailwind-merge'
import { IconType } from '../../assets/Icons';
import { TooltipWrapper } from '../tooltip/TooltipWrapper';
import Icon from '@/app/components/common/Icon';

type Props = {
  icon: IconType;
  name?: string;
  tip?: string;
  className?: string;
  handleClick?: () => void;
}

export default function IconButton({ icon, className, name, tip, handleClick }: Props) {
  const content = (
    <button title={name} onClick={ handleClick } className={twMerge("flex flex-shrink-0 items-center hover:bg-btn-hover rounded-full p-2", className)}>
      {<Icon icon={icon} className='w-6' />}
      {name && <p>{name}</p>}
    </button>  
  )
  if (tip) {
    return (
      <TooltipWrapper content={tip}>
        {content}
      </TooltipWrapper>
    )
  }
  return content;
}