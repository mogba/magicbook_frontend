import { useQuery } from "react-query";

import { useMagicFetch } from "./use-magic-fetch";

export function useGetYouTubeUrls() {
  const { magicFetch } = useMagicFetch();

  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await magicFetch<
        { id: number; url: string; video_id: string; date_created: string }[]
      >("youtube-urls");
      return response.data;
    },
  });
}
