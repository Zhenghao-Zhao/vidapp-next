import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import useDebounce from "@/app/_hooks/useDebounce";
import useFetchFollowing from "@/app/_hooks/useFetchPaginatedFollowing";
import { getFollowingQueryResult } from "@/app/_queries";
import { Following } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScrollLoader from "../../common/InfiniteScrollLoader";
import { ListLoader, SpinnerSize } from "../../loaders";
import SearchBox from "../../searchBox";

export default function FollowingList({ uid }: { uid: string }) {
  const { list, fetchNextPage, isFetching, hasNextPage } =
    useFetchFollowing(uid);
  const {
    data,
    refetch,
    isFetching: isSearching,
  } = useQuery<Following[]>({
    queryKey: ["following", uid, "search"],
    queryFn: () => getFollowingQueryResult(uid, query),
  });
  const [query, setQuery] = useState("");
  useDebounce(refetch, query);

  if (!isFetching && list.length < 1)
    return (
      <div className="grow flex items-center justify-center font-bold text-2xl">
        No following
      </div>
    );
  return (
    <div className="flex flex-col max-w-[400px] max-h-[400px] w-following-list-width h-following-list-height bg-white rounded-lg">
      <div className="font-bold text-black border-b text-lg h-[50px] shrink-0 flex items-center justify-center">
        Following
      </div>
      <div className="py-1 px-4 relative flex items-center justify-center shrink-0">
        <SearchBox query={query} setQuery={setQuery} isSearching={isSearching} />
      </div>
      <div className="grow overflow-y-auto h-auto">
        {(data ?? list).map((following: Following, i: number) => {
          return (
            <div key={i} className="flex px-4 py-2 justify-center items-center">
              <ProfileImage
                imageURL={following.imageURL}
                twSize="size-comment-profile-image-size"
              />
              <div className="pl-4 grow">
                <p className="font-bold">{following.name}</p>
                <p className="text-gray-500">{following.username}</p>
              </div>
              <button className="bg-gray-500 text-white ml-auto h-fit py-2 px-4 rounded-lg">
                Following
              </button>
            </div>
          );
        })}
        {list.length > 0 ? (
          <InfiniteScrollLoader
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            loaderSize={SpinnerSize.SMALL}
          />
        ) : (
          <ListLoader />
        )}
      </div>
    </div>
  );
}
