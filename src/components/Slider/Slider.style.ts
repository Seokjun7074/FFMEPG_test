import styled from "styled-components";

export const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 900px;
  height: 600px;
  background-color: antiquewhite;
`;

export const FilterPriceSlide = styled.div`
  position: relative;
  height: 40px;
  width: 650px;
  border-radius: 10px;
  background-color: lightgray;
`;
interface InnerSliderProps {
  $rangeMinPercent: number;
  $rangeMaxPercent: number;
}

export const FilterPriceSlideInner = styled.div<InnerSliderProps>`
  position: absolute;
  left: ${(props) => props.$rangeMinPercent}%;
  right: ${(props) => props.$rangeMaxPercent}%;
  height: 40px;
  border-radius: 10px;
  background-color: lightgreen;
`;

export const FilterPriceRangeWrap = styled.div`
  position: relative;
`;

export const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -40px;
  left: -5px;
  height: 40px;
  width: 100%;
  -webkit-appearance: none;
  background: none;
  &::-webkit-slider-thumb {
    height: 50px;
    width: 20px;
    border-radius: 5px;
    background-color: gray;
    -webkit-appearance: none;
  }
  pointer-events: none;
  cursor: grabbing;

  &::-webkit-slider-thumb {
    pointer-events: auto;
  }
`;

export const FilterPriceRangeMax = styled(FilterPriceRangeMin)`
  left: 5px;
`;
