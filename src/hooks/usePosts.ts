import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

function usePosts(query: PostQuery) {
  function fetchPosts({ pageParam = 1 }) {
    return axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);
  }

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 10 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      // In jsonplaceholder, anything beyond the last page is empty array
      //
      // A better API returns total number of records so we can compute when we will hit
      // the last page.
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}

export default usePosts;
