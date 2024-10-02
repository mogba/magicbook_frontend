import { useQuery, useQueryClient } from "react-query";

import { useMagicFetch } from "./use-magic-fetch";

export function useYoutubeUrls() {
  const queryClient = useQueryClient();
  const { magicFetch } = useMagicFetch();

  function useGetYouTubeUrls() {
    return useQuery({
      queryKey: ["videos"],
      queryFn: async () =>
        await magicFetch<
          { id: number; url: string; video_id: string; date_created: string }[]
        >("youtube-urls/"),
    });
  }

  function invalidateVideosQuery() {
    queryClient.invalidateQueries("videos");
  }

  function createYouTubeUrl(url: string) {
    magicFetch<void>("youtube-urls/", {
      method: "POST",
      body: { url },
    });

    invalidateVideosQuery();
  }

  function getYouTubeUrl(id: number) {
    return magicFetch<{
      id: number;
      url: string;
      video_id: string;
      date_created: string;
    }>(`youtube-urls/${id}/`);
  }

  function updateYouTubeUrl(id: number, url: string) {
    magicFetch<void>(`youtube-urls/${id}/`, {
      method: "PUT",
      body: { url },
    });

    invalidateVideosQuery();
  }

  function deleteYouTubeUrl(id: number) {
    magicFetch<void>(`youtube-urls/${id}/`, {
      method: "DELETE",
    });

    invalidateVideosQuery();
  }

  return {
    useGetYouTubeUrls,
    createYouTubeUrl,
    getYouTubeUrl,
    updateYouTubeUrl,
    deleteYouTubeUrl,
  };
}
