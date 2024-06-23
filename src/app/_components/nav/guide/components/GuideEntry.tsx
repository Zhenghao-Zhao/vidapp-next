import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import { Link } from "react-transition-progress/next";
import { IconType, icons } from "../../../ui/icons";
import { IconButton } from "@/app/_components/ui/buttons";

type Props = {
  icon?: string;
  title: string;
  url: string;
  className?: string;
  image?: string;
};

export function GuideEntry({ icon, title, url, image }: Props) {
  const { data } = useDataContext();
  return (
    <Link
      href={url ?? data?.profile.username}
      className="flex flex-shrink-0 items-center hover:bg-btn-hover-primary px-4 h-10 rounded-lg"
    >
      {(icon && <div className="w-6 mr-6">{icons[icon]}</div>) || (
        <div className="mr-6">
          <ProfileImage imageURL={image} twSize="size-6" />
        </div>
      )}
      <div className="flex-1 text-left truncate">{title}</div>
    </Link>
  );
}

type MiniProps = {
  icon: IconType;
  title: string;
};

export function MiniGuideEntry({ icon, title }: MiniProps) {
  return (
    <IconButton
      as="button"
      className="flex-col w-16 py-4 rounded-lg gap-[6px]"
      icon={icon}
      label={title}
    />
  );
}
