import { twMerge } from "tailwind-merge";
import { IconType, icons } from "../../_assets/Icons";
import { IconButton } from "../common";
import Link from "next/link";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import LinkWithLoader from "../common/LinkWithLoader";

type Props = {
  icon?: IconType;
  title: string;
  url: string;
  className?: string;
  image?: string;
};

export function GuideEntry({ icon, title, url, image }: Props) {
  const { profile } = useAuthContext();
  return (
    <LinkWithLoader
      href={profile?.username ?? ""}
      className="flex flex-shrink-0 items-center hover:bg-btn-hover px-4 h-10 rounded-lg"
    >
      {(icon && <div className="w-6 mr-6">{icons[icon]}</div>) ||
        (image && (
          <div className="w-6 mr-6">
            <img className="rounded-full" src={image} alt="profile image" />
          </div>
        ))}
      <div className="flex-1 text-left truncate">{title}</div>
    </LinkWithLoader>
  );
}

type MiniProps = {
  icon: IconType;
  title: string;
};

export function MiniGuideEntry({ icon, title }: MiniProps) {
  return (
    <IconButton
      className="flex-col w-16 py-4 rounded-lg gap-[6px]"
      icon={icon}
      name={title}
    />
  );
}
