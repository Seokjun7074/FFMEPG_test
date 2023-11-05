import { useEffect, useRef, useState } from "react";
import * as S from "./VideoEditor.style";
import { fetchFile } from "@ffmpeg/ffmpeg"; // https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
import { useFFmpeg } from "../hooks/useFFmpeg";
import { useRecoilValue } from "recoil";
import { videoAtom } from "../store/video";
import Slider from "../components/Slider/Slider";

const VideoEditor = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    ffmpeg.FS("writeFile", `myVideo.mp4`, await fetchFile(url));
    await ffmpeg.run("-ss", `1`, "-accurate_seek", "-i", `myVideo.mp4`, "-to", `5`, "-codec", "copy", "newVideo.mp4");
    const result = ffmpeg.FS("readFile", "newVideo.mp4");
    const resultPreview = URL.createObjectURL(new Blob([result.buffer], { type: "video/mp4" }));
    console.log(resultPreview);
  };

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", () => {
      setEndTime(video.duration);
    });
  }, [videoState]);

  return (
    <S.VideoEditoerWrapper>
      {videoState.url && (
        <div>
          <S.VideoTag src={videoState.url} ref={videoRef} controls />
        </div>
      )}
      <Slider />
      <h1>aa</h1>
      <button onClick={() => cutVideo(videoState.url)}>자르기</button>
    </S.VideoEditoerWrapper>
  );
};

export default VideoEditor;
