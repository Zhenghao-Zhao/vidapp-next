import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { OutsideCloser } from "@/app/_components/common";
import SearchBox from "@/app/_components/ui/searchBox";
import useSearchUsers from "@/app/_libs/hooks/paginatedFetch/useSearchUsers";
import useDebounce from "@/app/_libs/hooks/useDebounce";
import { UserSearchItem } from "@/app/_libs/types";
import Link from "next/link";
import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function SearchBar({ className }: Props) {
  const [query, setQuery] = useState("");
  const { list, isFetching } = useSearchUsers(query);
  const [showResult, setShowResult] = useState(true);

  return (
    <OutsideCloser
      onClickInside={() => setShowResult(true)}
      onClickOutside={() => setShowResult(false)}
      className="flex basis-[600px] h-10"
    >
      <div
        className={twMerge(
          "w-full h-full flex relative items-center rounded-lg",
          className
        )}
      >
        <SearchBox isSearching={isFetching} setQuery={setQuery} />
        {list.length > 0 && showResult && (
          <div className="p-2 absolute top-full w-full border border-solid bg-background-primary">
            {list.map((d: UserSearchItem, i: number) => (
              <Link
                key={i}
                href={d.username}
                className="flex p-2 items-center hover:bg-btn-hover-primary"
              >
                <ProfileImage imageURL={d.imageURL} twSize="size-10" />
                <div className="ml-4">{d.username}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </OutsideCloser>
  );
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setQuery: (q: string) => void;
}

export function SearchInput({ setQuery, ...props }: SearchInputProps) {
  const [draft, setDraft] = useState("");
  // if user clears input reset query to empty string immediately
  useDebounce(() => setQuery(draft), draft, draft.length > 0 ? 500 : 0);
  return (
    <input
      {...props}
      onChange={(e) => setDraft(e.target.value)}
      value={draft}
    />
  );
}
