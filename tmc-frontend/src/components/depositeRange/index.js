import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./indexdeposite.css";
const MultiRangeSlider = ({ min, max, deposit, symbol, setDeposit }) => {
  const minVal = min;
  const [maxVal, setMaxVal] = useState(deposit);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const bar = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Handle click on the slider bar
  const handleClick = (event) => {
    if (!isDragging) {
      const clickPosition = event.clientX;
      const sliderRect = bar.current.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const sliderLeft = sliderRect.left;
      const clickOffset = clickPosition - sliderLeft;
      const clickPercentage = (clickOffset / sliderWidth) * 100;
      const value = Math.round((clickPercentage * (max - min)) / 100) + min;

      setMaxVal(value);
      setDeposit(value * 100);
      maxValRef.current = value;
    }
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  return (
    <div className="mt-14 container flex flex-col w-full">
      <div className="w-full flex flex-row justify-between">
        <div className="">Deposit</div>
        <div className="">
          {symbol}
          {maxVal * 100}
        </div>
      </div>
      <div
        className="slider"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className="mt-4 Dright">
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal);
              setMaxVal(value);
              setDeposit(value * 100);
              maxValRef.current = value;
            }}
            className="thumbdepo thumb--Dright"
          />
        </div>
        <div ref={bar} className="slider__track" />
        <div ref={range} className="Dslider__range" />
        <div className="slider2"></div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
