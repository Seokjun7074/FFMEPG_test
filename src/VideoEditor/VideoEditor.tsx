import { useEffect, useRef } from "react";
import * as S from "./VideoEditor.style";
import { fetchFile } from "@ffmpeg/ffmpeg"; // https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
import { useFFmpeg } from "../hooks/useFFmpeg";

interface VideoEditorProps {
  videoPreview: string;
}

const VideoEditor = ({ videoPreview }: VideoEditorProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

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
