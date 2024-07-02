import { IconButton } from "@/app/_components/ui/buttons";
import { GuideSectionType } from "@/app/_libs/types";
import { useMemo, useState } from "react";
import { IconType, icons } from "../../../ui/icons";
import { GuideEntry } from "./GuideEntry";

export default function GuideSection({
  title,
  entries,
  icon,
  collapseSize = entries.length,
}: GuideSectionType) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  const openEntries = useMemo((): JSX.Element[] => {
    return entries.reduce<JSX.Element[]>((rst, curr, i) => {
      if (i < collapseSize) {
        rst.push(
          <GuideEntry
            key={i}
            icon={curr.icon}
            title={curr.name}
            url={curr.url}
            image={curr.image}
          />,
        );
      }
      return rst;
    }, []);
  }, [collapseSize, entries]);

  const collapsedEntries = useMemo(() => {
    const rtn =
      collapseSize >= entries.length
        ? null
        : entries.reduce<JSX.Element[]>((rst, curr, i) => {
            if (i >= collapseSize) {
              rst.push(
                <GuideEntry
                  key={i}
                  icon={curr.icon}
                  title={curr.name}
                  url={curr.url}
                  image={curr.image}
                />,
              );
            }
            return rst;
          }, []);
    return rtn;
  }, [collapseSize, entries]);

  const collapseButton =
    collapseSize >= entries.length ? null : isCollapsed ? (
      <IconButton
        as="button"
        icon={IconType.ArrowDown}
        className="rounded-lg px-4 gap-6"
        label={`Show More`}
        handleClick={handleClick}
      />
    ) : (
      <IconButton
        as="button"
        icon={IconType.ArrowUp}
        className="rounded-lg px-4 gap-6"
        label={`Show Fewer`}
        handleClick={handleClick}
      />
    );

  const data = (
    <div>
      {openEntries}
      {!isCollapsed && collapsedEntries}
      {collapseButton}
    </div>
  );
  return (
    <div className="w-full flex flex-col px-2">
      <div className="flex items-center px-4">
        {title && <p className="font-semibold text-[16px] py-2">{title}</p>}
        {icon !== undefined && <div className="w-5 ml-2">{icons[icon]}</div>}
      </div>
      {data}
    </div>
  );
}
