import FollowButton from "@/app/(pages)/[username]/_components/FollowButton";
import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { getFriendsQueryResult } from "@/app/_api/queries";
import useFetchFriends from "@/app/_hooks/paginatedFetch/useFetchPaginatedFriends";
import useDebounce from "@/app/_hooks/useDebounce";
import { Friend, Friendship } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScrollLoader from "../../_common/InfiniteScrollLoader";
import LinkWithLoader from "../../_common/LinkWithLoader";
import { ListLoader, SpinnerSize } from "../../_ui/loaders";
import SearchBox from "../../_ui/searchBox";

export default function FriendList({
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
    <div className="flex flex-col max-w-[400px] max-h-[400px] w-following-list-width h-following-list-height rounded-lg">
      <div className="font-bold border-b text-lg h-[50px] shrink-0 flex items-center justify-center">
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
          (data ?? list).map((friend: Friend, i: number) => {
            return (
              <div
                key={i}
                className="flex px-4 py-2 justify-center items-center"
              >
                <ProfileImage
                  imageURL={friend.imageURL}
                  twSize="size-comment-profile-image-size"
                />
                <div className="pl-4 grow">
                  <LinkWithLoader
                    href={friend.username}
                    className="font-bold"
                  >
                    {friend.name}
                  </LinkWithLoader>
                  <p className="text-gray-500">{friend.username}</p>
                </div>
                <FollowButton
                  has_followed={friend.has_followed}
                  uid={uid}
                  following_uid={friend.uid}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
