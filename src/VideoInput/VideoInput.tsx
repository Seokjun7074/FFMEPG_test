import * as S from "./VideoInput.styled";

interface VideoInputProps {
  setVideoFile: React.Dispatch<React.SetStateAction<File[]>>;
  setVideoPreview: React.Dispatch<React.SetStateAction<string>>;
}

const VideoInput = ({ setVideoFile, setVideoPreview }: VideoInputProps) => {
  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile([e.target.files![0]]);
    setVideoPreview(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <S.VideoInputWrapper>
      <S.InputVideo type="file" placeholder="비디오" onChange={imageUpload} />
    </S.VideoInputWrapper>
  );
};
export default VideoInput;
