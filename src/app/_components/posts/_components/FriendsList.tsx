import FollowButton from "@/app/(pages)/[username]/_components/FollowButton";
import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import useFetchFriends from "@/app/_hooks/pagination/useFetchPaginatedFriends";
import useDebounce from "@/app/_hooks/useDebounce";
import { getFriendsQueryResult } from "@/app/_queries";
import { Friend, Friendship } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScrollLoader from "../../common/InfiniteScrollLoader";
import LinkWithLoader from "../../common/LinkWithLoader";
import { ListLoader, SpinnerSize } from "../../loaders";
import SearchBox from "../../searchBox";

export default function FriendsList({
  uid,
  friendship,
}: {
  uid: string;
  friendship: Friendship;
}) {
  const { list, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useFetchFriends(uid, friendship);

  const {
    data,
    refetch,
    isFetching: isSearching,
  } = useQuery<Friend[]>({
    queryKey: ["friends", uid, "search"],
    queryFn: () => getFriendsQueryResult(uid, friendship, query),
  });

  const [query, setQuery] = useState("");
  useDebounce(refetch, query);
  return (
    <div className="flex flex-col max-w-[400px] max-h-[400px] w-following-list-width h-following-list-height bg-white rounded-lg">
      <div className="font-bold text-black border-b text-lg h-[50px] shrink-0 flex items-center justify-center">
        {friendship.toUpperCase()}
      </div>
      <div className="py-1 px-4 relative flex items-center justify-center shrink-0">
        <SearchBox
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
        />
      </div>
      <div className="grow overflow-y-auto h-auto">
        {isFetching ? (
          isFetchingNextPage ? (
            <InfiniteScrollLoader
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
              loaderSize={SpinnerSize.SMALL}
            />
          ) : (
            <ListLoader />
          )
        ) : (
          (data ?? list).map((following: Friend, i: number) => {
            return (
              <div
                key={i}
                className="flex px-4 py-2 justify-center items-center"
              >
                <ProfileImage
                  imageURL={following.imageURL}
                  twSize="size-comment-profile-image-size"
                />
                <div className="pl-4 grow">
                  <LinkWithLoader
                    href={following.username}
                    className="font-bold"
                  >
                    {following.name}
                  </LinkWithLoader>
                  <p className="text-gray-500">{following.username}</p>
                </div>
                <FollowButton
                  has_followed={true}
                  uid={uid}
                  following_uid={following.uid}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
