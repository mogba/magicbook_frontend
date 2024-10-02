import { useState } from "react";

import { useYoutubeUrls } from "../../api";

export function VideoInputForm(props: {
  inputFormData?: { id: number } | { id: number; url: string };
  onAfterSubmit: () => void;
}) {
  const { createYouTubeUrl, updateYouTubeUrl } = useYoutubeUrls();

  const [formData, setFormData] = useState<{ id?: number; url?: string }>(
    props?.inputFormData || {
      id: undefined,
      url: "",
    }
  );

  const onSubmitVideoUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.url) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    if (formData.id) {
      updateYouTubeUrl(formData.id, formData.url);
    } else {
      createYouTubeUrl(formData.url);
    }

    props.onAfterSubmit();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmitVideoUrl}
        >
          <div className="mb-4">
            <input
              id="id"
              type="hidden"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: Number(e.target.value) })
              }
              placeholder="Enter YouTube URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              YouTube URL
            </label>

            <input
              id="url"
              type="text"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="Enter YouTube URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
