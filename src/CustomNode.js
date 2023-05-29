import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const Node = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-radius: 30px;
  background: linear-gradient(360deg, rgb(227 150 245), rgb(255 146 189));
  color: black;
  font-size:1.4em;
  border: 4px solid
    ${(props) =>
      props.selected ? "#050079" : props.theme.nodeBorder};

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
