import { useQuery } from "react-query";

import { magicFetch } from "../tools";

export function getYouTubeUrls() {
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
