import { useEffect, useState } from "react";
import * as S from "./Slider.style";

const Slider = () => {
  const MIN = 0;
  const MAX = 60;
  const GAP = 0;
  const [rangeMinValue, setRangeMinValue] = useState(MIN);
  const [rangeMaxValue, setRangeMaxValue] = useState(MAX);
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
        setRangeMinPercent((rangeMinValue / MAX) * 100);
        setRangeMaxPercent(100 - (rangeMaxValue / MAX) * 100);
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
          min={MIN}
          max={MAX - GAP}
          step="0.5"
          value={rangeMinValue}
          onChange={(e) => {
            minValueHandler(e);
          }}
        />
        <S.FilterPriceRangeMax
          type="range"
          min={MIN + GAP}
          max={MAX}
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
