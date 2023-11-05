import { useEffect, useRef, useState } from "react";
import * as S from "./VideoEditor.style";
import { fetchFile } from "@ffmpeg/ffmpeg"; // https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
import { useFFmpeg } from "../hooks/useFFmpeg";
import { useRecoilState, useRecoilValue } from "recoil";
import { endAtom, startAtom, videoAtom } from "../store/video";
import Slider from "../components/Slider/Slider";

const VideoEditor = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [startTime, setStartTime] = useRecoilState(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [duration, setDuration] = useState(0);

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    ffmpeg.FS("writeFile", `myVideo.mp4`, await fetchFile(url));
    await ffmpeg.run(
      "-ss",
      `${startTime}`,
      "-accurate_seek",
      "-i",
      `myVideo.mp4`,
      "-to",
      `${endTime}`,
      "-codec",
      "copy",
      "newVideo.mp4"
    );
    const result = ffmpeg.FS("readFile", "newVideo.mp4");
    const resultPreview = URL.createObjectURL(new Blob([result.buffer], { type: "video/mp4" }));
    console.log(resultPreview);
  };

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", () => {
      setEndTime(video.duration);
      setDuration(video.duration);
    });
  }, [videoState]);

  return (
    <S.VideoEditoerWrapper>
      {videoState.url && <S.VideoTag src={videoState.url} ref={videoRef} controls />}
      <Slider duration={duration} />
      <h1
        onClick={() => {
          console.log(startTime, endTime);
        }}
      >
        CHECK
      </h1>
      <button onClick={() => cutVideo(videoState.url)}>자르기</button>
    </S.VideoEditoerWrapper>
  );
};

export default VideoEditor;
