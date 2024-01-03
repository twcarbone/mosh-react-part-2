import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function usePosts(userId: number | undefined) {
  function fetchPosts() {
    return axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data);
  }

  return useQuery<Post[], Error>({
    // queryKey should match pattern of API endpoint (ex: /users/1/posts)
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: fetchPosts,
    staleTime: 10 * 1000,
  });
}

export default usePosts;
