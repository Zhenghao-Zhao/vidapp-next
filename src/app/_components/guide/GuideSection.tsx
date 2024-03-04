import { useMemo, useState } from "react";
import { GuideSectionType } from "../../_assets/Data";
import { IconType, icons } from "../../_assets/Icons";
import { GuideEntry } from "./GuideEntry";
import IconButton from "../common/buttons/IconButton";

//todos: rename collapse
export default function GuideSection({
  title,
  data,
  icon,
  collapseSize = data.length,
}: GuideSectionType) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  const openEntries = useMemo((): JSX.Element[] => {
    return data.reduce<JSX.Element[]>((rst, curr, i) => {
      if (i < collapseSize) {
        rst.push(
          <GuideEntry
            key={i}
            icon={curr.icon}
            title={curr.name}
            url={curr.url}
            image={curr.image}
          />
        );
      }
      return rst;
    }, []);
  }, [collapseSize, data]);

  const collapsedEntries = useMemo(() => {
    const rtn =
      collapseSize >= data.length
        ? null
        : data.reduce<JSX.Element[]>((rst, curr, i) => {
            if (i >= collapseSize) {
              rst.push(
                <GuideEntry
                  key={i}
                  icon={curr.icon}
                  title={curr.name}
                  url={curr.url}
                  image={curr.image}
                />
              );
            }
            return rst;
          }, []);
    return rtn;
  }, [collapseSize, data]);

  const collapseButton =
    collapseSize >= data.length ? null : isCollapsed ? (
      <IconButton
        icon={IconType.ArrowDown}
        className="rounded-lg px-4 gap-6"
        name={`Show More`}
        handleClick={handleClick}
      />
    ) : (
      <IconButton
        icon={IconType.ArrowUp}
        className="rounded-lg px-4 gap-6"
        name={`Show Fewer`}
        handleClick={handleClick}
      />
    );

  return (
    <div className="w-full flex flex-col border-b border-solid px-2 py-2 ">
      <div className="flex items-center px-4">
        {title && <p className="font-semibold text-[16px] py-2">{title}</p>}
        {icon != undefined && <div className="w-5 ml-2">{icons[icon]}</div>}
      </div>
      {openEntries}
      {!isCollapsed && collapsedEntries}
      {collapseButton}
    </div>
  );
}
