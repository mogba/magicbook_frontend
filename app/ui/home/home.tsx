"use client";

import { useState } from "react";

import { useYoutubeUrls } from "../api";

import { useVideoInputForm } from "./hooks";

export function Home() {
  const { useGetYouTubeUrls } = useYoutubeUrls();
  const { data, isLoading } = useGetYouTubeUrls();
  const { renderVideoInputForm, onEditVideo, onDeleteVideo } =
    useVideoInputForm();

  const [selectedVideoId, setSelectedVideoId] = useState<string>();

  return (
    <div className="flex flex-row gap-8 items-center h-screen w-screen ml-64">
      <div>
        <div>{renderVideoInputForm()}</div>

        <div>
          {isLoading && <h2>Loading your favorite YouTube videos</h2>}

          {!isLoading && (
            <div className="flex flex-col gap-4">
              <h2>
                <strong>Your favorite YouTube videos</strong>
              </h2>

              {data?.error && <p>{data.message}</p>}

              {!data?.error && (
                <div className="flex flex-col gap-8">
                  {data?.data?.map((url) => (
                    <ol key={url.id}>
                      <div>
                        <span
                          className={"p-24 bg-black"}
                          onClick={() => setSelectedVideoId(url.video_id)}
                        >
                          {url.url}
                        </span>
                        <button
                          onClick={() =>
                            onEditVideo({ id: url.id, url: url.url })
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => onDeleteVideo({ id: url.id })}>
                          Remove
                        </button>
                      </div>
                    </ol>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedVideoId && (
        <div>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/fxyz-dP_CHU?si=${selectedVideoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
