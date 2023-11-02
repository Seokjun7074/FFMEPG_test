import styled from "styled-components";
import VideoInput from "./VideoInput/VideoInput";
import VideoEditor from "./VideoEditor/VideoEditor";
import { useState } from "react";

const Video = () => {
  const [videoFile, setVideoFile] = useState<File[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");

  return (
    <Wrapper>
      <VideoEditor videoPreview={videoPreview} />
      <VideoInput
        setVideoFile={setVideoFile}
        setVideoPreview={setVideoPreview}
      />
    </Wrapper>
  );
};

export default Video;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
