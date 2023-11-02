import { FFmpeg, createFFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef } from "react";

export const useFFmpeg = () => {
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const init = async () => {
    try {
      await ffmpegRef.current!.load();
    } catch (error) {
      console.log("[init FFMPEG]", error);
    }
  };

  useEffect(() => {
    ffmpegRef.current = createFFmpeg({
      log: false,
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });
    init();
  }, []);

  return { ffmpegRef };
};
