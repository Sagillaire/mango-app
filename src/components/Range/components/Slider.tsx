import React from "react";

const Slider = ({ percentMin, percentMax, startDrag, currentMin, currentMax }) => {
  return (
    <div className="slider-container">
      <div className="slider-track"></div>
      <div
        className="slider-range"
        role="progressbar"
        style={{
          left: `${percentMin}%`,
          width: `${percentMax - percentMin}%`,
        }}
      ></div>
      <div
        role="slider"
        className="slider-thumb"
        style={{ left: `${percentMin}%` }}
        onMouseDown={() => startDrag(true)}
      >
        <span role="tooltip" className="tooltip">
          {currentMin}
        </span>
      </div>
      <div
        role="slider"
        className="slider-thumb"
        style={{ left: `${percentMax}%` }}
        onMouseDown={() => startDrag(false)}
      >
        <span role="tooltip" className="tooltip">
          {currentMax}
        </span>
      </div>
    </div>
  );
};

export default Slider;
