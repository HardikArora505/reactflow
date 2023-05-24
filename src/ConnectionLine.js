import React from "react";

export default ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle
}) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#ff0072"
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#000"
        r={8}
        stroke="#ff0072"
        strokeWidth={2}
      />
    </g>
  );
};
