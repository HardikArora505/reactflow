import React, { useCallback, useEffect, useRef, useState } from "react";
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
    let initialNodes = []
    let initialEdges = []
    const [loading, setLoading] = useState(false)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {

        const fetchJson = () => {
            setLoading(true)
            const data = manifest.nodes
            const keys = Object.keys(data)
            const s = new Set()
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
            //---------------------------------------------------------------------------------------------------------------------------------------
            let edges = []
            for (let i = 0; i < nodesArray.length; i++) {
                if (nodesArray[i].length > 0) {
                    for (let j = 0; j < nodesArray[i].length; j++) {
                        if (!s.has(nodesArray[i][j])) {
                            s.add(nodesArray[i][j])
                            let k = keys.indexOf(nodesArray[i][j])
                            if (k === -1) {
                                continue
                            }
                            let p = {
                                id: `e${i}-${k}`,
                                source: `${i}`,
                                target: `${k}`,
                                style: {
                                    strokeWidth: 2,
                                    stroke: "#FF0072"
                                },
                                markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
                            }
                            edges.push(p)
                        }
                    }
                    s.clear()
                }
            }  // computes edges array
            //----------------------------------------------------------------------------------------------------------------------------------------
            setEdges(edges)
            setLoading(false)// will work in async call
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
        [setEdges]
    );
    //-----------------------------------------------------------------------------------------------------------
    const onNodeClick = useCallback((event, node) => {   //breaking 
        // Change the color of the edges connected to the node that was clicked.
        event.stopPropagation()
        const newedges = edges.map((edge) => {
            if (edge.source === node.id || edge.target === node.id) {
                return {
                    ...edge,
                    style: {
                        stroke: "#01e1ff",
                        strokeWidth: 5
                    },
                    markerEnd: { type: "arrowclosed", color: "#01e1ff", width: 20, height: 20 },
                    animated: true
                }
            }
            else {
                return {
                    ...edge,
                    style: {
                        stroke: "#FF0072",
                        strokeWidth: 2
                    },
                    markerEnd: { type: "arrowclosed", color: "#FF0072", width: 30, height: 30 },
                    animated: false
                }
            }

        })

        setEdges(newedges);
    }, [edges])
    //-----------------------------------------------------------------------------------------------------------------------
    const setDefaultEdges = useCallback((event, node) => {   //breaking 
        // Change the color of the edges connected to the node that was clicked
        console.log("parent event", event)
        const newedges = edges.map((edge) => {
            return {
                ...edge,
                style: {
                    stroke: "#FF0072",
                    strokeWidth: 2
                },
                markerEnd: { type: "arrowclosed", color: "#FF0072", width: 30, height: 30 },
                animated: false
            }
        })

        setEdges(newedges);
    }, [edges])



    return (
        <div style={{ height: "100vh", width: "100vw" }} >
            {loading ? <h1>Loading...</h1> :
                <ReactFlowStyled
                    nodes={nodes}
                    edges={edges}
                    onClick={setDefaultEdges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onNodeClick={onNodeClick}
                    connectionLineComponent={ConnectionLine}
                    fitView
                    elevateEdgesOnSelect={true}
                    snapGrid={[25, 25]}
                    snapToGrid={true}
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