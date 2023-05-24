import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Panel,
    Background
} from "reactflow";

import "reactflow/dist/style.css";
import "./app.css"
import ConnectionLine from "./ConnectionLine";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import CustomNode from "./CustomNode";
import manifest from './manifest.json'
const nodeTypes = {
    custom: CustomNode
};
var randomNumber = () => {
    return Math.floor(Math.random() * 2501);
};

// const initialNodes = [
//     {
//         id: "0",
//         position: { x: 1161, y: 2439 },
//         type: "custom",
//         data: { label: "seed.demo_transformation.demo_employee_data" }
//     },
//     {
//         id: "1",
//         position: { x: 1916, y: 747 },
//         type: "custom",
//         data: {
//             label: "snapshot.demo_transformation.snapshot_for_demo_employee_data"
//         }
//     },
//     {
//         id: "2",
//         position: { x: 2294, y: 1535 },
//         type: "custom",
//         data: { label: "model.demo_transformation.aggregated_data" }
//     },
//     {
//         id: "3",
//         position: { x: 927, y: 1008 },
//         type: "custom",
//         data: { label: "model.demo_transformation.balance_record_data" }
//     },
//     {
//         id: "4",
//         position: { x: 2030, y: 269 },
//         type: "custom",
//         data: { label: "model.demo_transformation.filter_data" }
//     },
//     {
//         id: "5",
//         position: { x: 1417, y: 1191 },
//         type: "custom",
//         data: { label: "model.demo_transformation.load_data" }
//     },
//     {
//         id: "6",
//         position: { x: 1729, y: 1997 },
//         type: "custom",
//         data: {
//             label: "test.demo_transformation.not_null_filter_data_id_sr.43027a81e7"
//         }
//     },
//     {
//         id: "7",
//         position: { x: 1586, y: 797 },
//         type: "custom",
//         data: {
//             label: "test.demo_transformation.unique_filter_data_id_sr.7e22171535"
//         }
//     },
//     {
//         id: "8",
//         position: { x: 2182, y: 2094 },
//         type: "custom",
//         data: {
//             label:
//                 "test.demo_transformation.accepted_values_filter_data_ownerind__1.3724d05a3a"
//         }
//     },
//     {
//         id: "9",
//         position: { x: 1629, y: 2293 },
//         type: "custom",
//         data: { label: "model.demo_transformation.transformed_data" }
//     },
//     {
//         id: "10",
//         position: { x: 465, y: 1180 },
//         type: "custom",
//         data: {
//             label:
//                 "test.demo_transformation.not_null_transformed_data_blnc_flg.c6eeecefd5"
//         }
//     },
//     {
//         id: "11",
//         position: { x: 1868, y: 423 },
//         type: "custom",
//         data: {
//             label:
//                 "test.demo_transformation.accepted_values_transformed_data_blnc_flg__low__medium__high.8cbf278b43"
//         }
//     },
//     {
//         id: "12",
//         position: { x: 299, y: 468 },
//         type: "custom",
//         data: {
//             label:
//                 "test.demo_transformation.dbt_utils_accepted_range_transformed_data_current_balance__True__1000000__0.036853d7d2"
//         }
//     },
//     {
//         id: "13",
//         position: { x: 924, y: 272 },
//         type: "custom",
//         data: { label: "model.demo_transformation.sample_bureau_mirror" }
//     },
//     {
//         id: "14",
//         position: { x: 1252, y: 211 },
//         type: "custom",
//         data: { label: "model.demo_transformation.sample_bureau_transformation" }
//     }
// ];
// const initialEdges = [
//     {
//         id: "e1-0",
//         source: "1",
//         target: "0",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e2-4",
//         source: "2",
//         target: "4",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e3-9",
//         source: "3",
//         target: "9",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e4-5",
//         source: "4",
//         target: "5",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e6-4",
//         source: "6",
//         target: "4",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e7-4",
//         source: "7",
//         target: "4",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e8-4",
//         source: "8",
//         target: "4",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e10-9",
//         source: "10",
//         target: "9",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e11-9",
//         source: "11",
//         target: "9",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e12-9",
//         source: "12",
//         target: "9",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e13-5",
//         source: "13",
//         target: "5",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     },
//     {
//         id: "e14-13",
//         source: "14",
//         target: "13",
//         style: { strokeWidth: 2, stroke: "#ff0072" },
//         markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//     }
// ];
const ReactFlowStyled = styled(ReactFlow)`
  background: linear-gradient(45deg, rgb(15 1 55) 0%, rgb(53 1 42) 100%);
`;
const MiniMapStyled = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
        background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
        fill: currentColor;
    }
}
`;
const Flow = ({ children }) => {
    let initialNodes=[]
    let initialEdges=[]
    const [loading, setLoading] = useState(false)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
 
    useEffect(() => {
        const fetchJson =() => {
            setLoading(true)
            const data = manifest.nodes
            const keys = Object.keys(data)
            const nodes = keys.map((e, i) => {
                return {
                    id: `${i}`,
                    position: {
                        x: randomNumber(),
                        y: randomNumber()
                    },
                    type: "custom",
                    data: {
                        label: e
                    }
                }
            })
            setNodes(nodes)
            let nodesArray = [];
            for (const key in data) {
                nodesArray.push(data[key].depends_on.nodes);
            }
            const edges = nodesArray.map((e, i) => {
                if (e.length > 0) {
                    return e.map((item) => {
                        let k = keys.indexOf(item)
                        return {
                            id: `e${i}-${k}`,
                            source: `${i}`,
                            target: `${k}`,
                            style: {
                                strokeWidth: 2,
                                stroke: "#FF0072"
                            },
                            markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
                        }
                    })
                }
            })
            
            setEdges(edges.flat().filter((e) => { return (e && e.target != -1) }))
            setLoading(false)
        }

        fetchJson()


    }, [])

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        style: {
                            strokeWidth: 2,
                            stroke: "#FF0072"
                        }
                    },
                    eds
                )
            ),
        []
    );
    // const onClick = (event) => {
    //   // event.stopPropagation();
    //   const updatedElements = edges.map((element) => {
    //     if (element.type === "edge") {
    //       return {
    //         ...element,
    //         style: { stroke: "#ccc" },
    //         animated: false // Set the normal color here
    //       };
    //     }
    //     return element;
    //   });
    //   setEdges(updatedElements);
    // };
    // const onEdgeClick = (event, edge) => {
    //   console.log("Clicked edge:", edge);
    //   if (edge.selected) {
    //     console.log(true);
    //   }
    // };

    const handleNodeSelection = (event, node) => {
        if (selectedNodeId === node.id) {
            // Node is being unselected
            setSelectedNodeId(null);
        } else {
            // Node is being selected
            setSelectedNodeId(node.id);
            console.log(node.id)
        }
    };
    const getEdgeColor = (edge) => {
        if (selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId)) {
            return 'red'; // Set the desired color for selected edges
        }
        return 'default'; // Set the default color for unselected edges
    };
    return (
        <div style={{ height: "100vh", width: "100vw" }} >
            {loading ? <h1>Loading...</h1> :
                <ReactFlowStyled
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    // onEdgeClick={onEdgeClick}
                    connectionLineComponent={ConnectionLine}
                    onNodeSelection={handleNodeSelection}
                    fitView
                    minZoom={0.1}
                >
                    <MiniMapStyled />
                    <ControlsStyled />
                    {children}
                </ReactFlowStyled>}
        </div>
    );
};
export default Flow