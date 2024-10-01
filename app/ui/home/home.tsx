import { getYouTubeUrls } from "@/app/lib/api";

export function Home() {
  const { data } = getYouTubeUrls();

  return <div>Testandoooo</div>;
}
