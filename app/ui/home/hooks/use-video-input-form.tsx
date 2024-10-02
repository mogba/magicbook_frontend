import { useCallback, useState } from "react";

import { VideoInputForm } from "../components";

export function useVideoInputForm() {
  const [formData, setFormData] = useState<
    { id: number } | { id: number; url: string } | undefined
  >();

  const onEditVideo = (params: { id: number; url: string }) => {
    setFormData({ id: params.id, url: params.url });
  };

  const onDeleteVideo = (params: { id: number }) => {
    setFormData({ id: params.id });
  };

  const onAfterSubmit = () => {
    setFormData(undefined);
  };

  const renderVideoInputForm = useCallback(() => {
    return (
      <VideoInputForm inputFormData={formData} onAfterSubmit={onAfterSubmit} />
    );
  }, [formData]);

  return {
    onEditVideo,
    onDeleteVideo,
    renderVideoInputForm,
  };
}
