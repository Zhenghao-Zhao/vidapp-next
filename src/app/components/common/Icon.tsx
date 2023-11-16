import { IconType } from "../../assets/Icons"
import { icons } from "../../assets/Icons"

type Props = {
  icon: IconType;
  className: string;
}

export default function Icon({ icon, className } : Props) {
  return (
    <div className={className}>
      {icons[icon]}
    </div>
  )
}