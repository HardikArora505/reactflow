import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const Node = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-radius: 30px;
  background: linear-gradient(360deg, black, #6d023ecf);
  color: white;
  border: 4px solid
    ${(props) =>
      props.selected ? props.theme.primary : props.theme.nodeBorder};

  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
  }
`;

export default memo(({ data, selected }) => {
  return (
    <Node selected={selected}>
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          fontSize: "1.3em",
          fontFamily: " Wix Madefor Display, sans-serif"
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
    </Node>
  );
});
