import styled from "styled-components";
import VideoInput from "./VideoInput/VideoInput";
import VideoEditor from "./VideoEditor/VideoEditor";

const Video = () => {
  return (
    <Wrapper>
      <VideoEditor />
      <VideoInput />
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
