import styled from "styled-components";

export const VideoEditoerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoTag = styled.video`
  width: 500px;
  background-color: whitesmoke;
  border-radius: 8px;
`;

export const Timeline = styled.div`
  width: 80%;
  height: 20px;
  background-color: lightgray;
  position: relative;
  margin-top: 20px;
`;

export const PlaybackRange = styled.div`
  position: absolute;
  height: 100%;
  background-color: #3498db;
  cursor: pointer;
  transition: transform 0.2s ease;
`;
