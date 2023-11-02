import { useEffect, useRef } from "react";
import * as S from "./VideoEditor.style";
import { FFmpeg, createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"; // https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md

interface VideoEditorProps {
  videoPreview: string;
}

const VideoEditor = ({ videoPreview }: VideoEditorProps) => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const cutVideo = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    ffmpeg.FS("writeFile", `myVideo.mp4`, await fetchFile(videoPreview));
    await ffmpeg.run(
      "-ss",
      `1`,
      "-accurate_seek",
      "-i",
      `myVideo.mp4`,
      "-to",
      `5`,
      "-codec",
      "copy",
      "newVideo.mp4"
    );
    const result = ffmpeg.FS("readFile", "newVideo.mp4");

    const resultPreview = URL.createObjectURL(
      new Blob([result.buffer], { type: "video/mp4" })
    );
    console.log(resultPreview);
  };

  return (
    <S.VideoEditoerWrapper>
      {videoPreview && (
        <div>
          <S.VideoTag src={videoPreview} ref={videoRef} controls />
        </div>
      )}
      <button onClick={cutVideo}>자르기</button>
    </S.VideoEditoerWrapper>
  );
};

export default VideoEditor;
