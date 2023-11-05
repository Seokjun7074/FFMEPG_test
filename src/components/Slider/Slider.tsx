import { useEffect, useState } from "react";
import * as S from "./Slider.style";
import { useRecoilState } from "recoil";
import { startAtom, endAtom } from "../../store/video";

interface SliderProps {
  duration: number;
}

const Slider = ({ duration }: SliderProps) => {
  const GAP = 0;
  // 실제 시작,종료 값
  const [rangeMinValue, setRangeMinValue] = useRecoilState(startAtom);
  const [rangeMaxValue, setRangeMaxValue] = useRecoilState(endAtom);
  // 색으로 보이는 부분
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  const minValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMinValue(parseInt(e.target.value));
  };

  const maxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  useEffect(() => {
    const twoRangeHandler = () => {
      if (rangeMaxValue - rangeMinValue < GAP) {
        setRangeMaxValue(rangeMinValue + GAP);
        setRangeMinValue(rangeMaxValue - GAP);
      } else {
        setRangeMinPercent((rangeMinValue / duration) * 100);
        setRangeMaxPercent(100 - (rangeMaxValue / duration) * 100);
      }
    };
    twoRangeHandler();
  }, [rangeMinValue, rangeMaxValue]);

  return (
    <>
      <S.FilterPriceSlide>
        <S.FilterPriceSlideInner $rangeMinPercent={rangeMinPercent} $rangeMaxPercent={rangeMaxPercent} />
      </S.FilterPriceSlide>
      <S.FilterPriceRangeWrap>
        <S.FilterPriceRangeMin
          type="range"
          min={0}
          max={duration - GAP}
          step="0.5"
          value={rangeMinValue}
          onChange={(e) => {
            minValueHandler(e);
          }}
        />
        <S.FilterPriceRangeMax
          type="range"
          min={0 + GAP}
          max={duration}
          step="0.5"
          value={rangeMaxValue}
          onChange={(e) => {
            maxValueHandler(e);
          }}
        />
      </S.FilterPriceRangeWrap>
    </>
  );
};

export default Slider;
