import { useSetRecoilState } from "recoil";
import * as S from "./VideoInput.styled";
import { videoAtom } from "../store/video";

const VideoInput = () => {
  const setVideoState = useSetRecoilState(videoAtom);
  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoState({
      file: e.target.files![0],
      url: URL.createObjectURL(e.target.files![0]),
    });
  };

  return (
    <S.VideoInputWrapper>
      <S.InputVideo type="file" placeholder="비디오" onChange={imageUpload} />
    </S.VideoInputWrapper>
  );
};
export default VideoInput;
