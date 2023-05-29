import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Panel,
    Background,
} from "reactflow";

import manifest from './manifest.json'
import catalog from './catalog.json'

import "reactflow/dist/style.css";
import "./flow.css"
import dagre from 'dagre';
import "./app.css"
import ConnectionLine from "./ConnectionLine";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import CustomNode from "./CustomNode";
const nodeTypes = {
    custom: CustomNode
};
// var randomNumber = () => {
//     return Math.floor(Math.random() * 3001);
// };

// const initialNodes=[
//     {
//       id: '0',
//       type: 'custom',
//       data: { label: 'seed.demo_transformation.demo_employee_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '1',
//       type: 'custom',
//       data: {
//         label: 'snapshot.demo_transformation.snapshot_for_demo_employee_data'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '2',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.aggregated_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '3',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.balance_record_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '4',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.filter_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '5',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.load_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '6',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.not_null_filter_data_id_sr.43027a81e7'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '7',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.unique_filter_data_id_sr.7e22171535'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '8',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.accepted_values_filter_data_ownerind__1.3724d05a3a'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '9',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.transformed_data' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '10',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.not_null_transformed_data_blnc_flg.c6eeecefd5'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '11',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.accepted_values_transformed_data_blnc_flg__low__medium__high.8cbf278b43'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '12',
//       type: 'custom',
//       data: {
//         label: 'test.demo_transformation.dbt_utils_accepted_range_transformed_data_current_balance__True__1000000__0.036853d7d2'
//       },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '13',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.sample_bureau_mirror' },
//       position: { x: 0, y: 0 }
//     },
//     {
//       id: '14',
//       type: 'custom',
//       data: { label: 'model.demo_transformation.sample_bureau_transformation' },
//       position: { x: 0, y: 0 }
//     }
//   ]
// const initialEdges=[
//     {
//       id: 'e1-0',
//       source: '1',
//       target: '0',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e2-4',
//       source: '2',
//       target: '4',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e3-9',
//       source: '3',
//       target: '9',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e4-5',
//       source: '4',
//       target: '5',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e6-4',
//       source: '6',
//       target: '4',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e7-4',
//       source: '7',
//       target: '4',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e8-4',
//       source: '8',
//       target: '4',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e10-9',
//       source: '10',
//       target: '9',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e11-9',
//       source: '11',
//       target: '9',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e12-9',
//       source: '12',
//       target: '9',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e13-5',
//       source: '13',
//       target: '5',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     },
//     {
//       id: 'e14-13',
//       source: '14',
//       target: '13',
//       style: { strokeWidth: 2, stroke: '#FF0072' },
//       markerEnd: { type: 'arrowclosed', color: '#ff0072', width: 30, height: 30 }
//     }
//   ]

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

const dagreGraph = new dagre.graphlib.Graph(); //initalize dagreGraph
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 1200;
const nodeHeight = 300;



const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};



const Flow = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [initialNodes, setInititialNodes] = useState([]);
    const [initialEdges, setInititialEdges] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [dates, setDates] = useState([]);
    const [sql, setSql] = useState([]);
    const [description, setDescription] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [AllTablesColumns, setAllTablesColumns] = useState([]);
    // const [SingleTableColumns, setSingleTableColumns] = useState([{ Header: "Column Name", accessor: "name" }, { Header: "Data Type", accessor: "type" }, { Header: "Comments", accessor: "comment" }]);
    const [SingleTableData, setSingleTableData] = useState([]);
    const [nodeId, setNodeId] = useState(null);

    useEffect(() => {

        const fetchJson = () => {
            setLoading(true)
            const data = manifest.nodes
            const catdata = catalog.nodes
            const keys = Object.keys(data)
            const catkeys = Object.keys(catdata)
            const s = new Set()
            const position = { x: 0, y: 0 }
            //nodes name array
            let nodesNameArray = []
            for (const key in data) {
                nodesNameArray.push(data[key].name);
            }
            const nodes = nodesNameArray.map((e, i) => {
                return {
                    id: `${i}`,
                    position,
                    type: "custom",
                    data: {
                        label: e
                    }
                }
            })

            const nodesColumns = []
            for (let i = 0; i < keys.length; i++) {
                let e = catkeys.find((k) => k == keys[i])
                if (e != undefined) {
                    let columns = catdata[e].columns
                    nodesColumns.push(columns)
                }
                else {
                    nodesColumns.push(null)
                }

            }
            setAllTablesColumns(nodesColumns)//setting all tables respective column objects

            setInititialNodes(nodes)
            let creationTime = [] //nodes creation time
            for (const key in data) {
                creationTime.push(new Date(data[key].created_at * 1000).toDateString());
            }
            setDates(creationTime)

            let rawSql = []//raw sql
            for (const key in data) {
                rawSql.push(data[key].raw_sql);
            }
            setSql(rawSql)
            const nodesDescription = []
            for (const key in data) {
                nodesDescription.push(data[key].description);
            }
            setDescription(nodesDescription)

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
            setInititialEdges(edges)
            setLoading(false)// will work in async call
        }

        fetchJson()


    }, [])


    //---------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        console.log("changed")
        //so that getLayoutedElements won't be called everytime the component renders
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges
        );
        setEdges(layoutedEdges)
        setNodes(layoutedNodes)
    }, [initialEdges, initialNodes])

    //------------------------------------------------------------------------------------------------------------------------------------------------------------


    //-----------------------------------------------------------------------------------------------------------------------------------------------------
    // const onLayout = useCallback(
    //     (direction) => {
    //         const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    //             nodes,
    //             edges,
    //             direction
    //         );

    //         setNodes([...layoutedNodes]);
    //         setEdges([...layoutedEdges]);
    //     },
    //     [nodes, edges]
    // );  Todo add panel from dager example pon react flow to switch between vertical and horizontal views

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
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
    const onNodeClick = useCallback((event, node) => {

        event.stopPropagation()
        setNodeId(node.id)
        const singlecolumn = AllTablesColumns[node.id]
        if (singlecolumn != null) {
            const columns = Object.keys(singlecolumn)
            // console.log(columns)
            setSingleTableData(columns.map((e) => {
                let k = singlecolumn[e]
                return {
                    name: k.name,
                    type: k.type,
                    comment: k.comment
                }
            }))

        }
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
    }, [edges, setEdges])
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
    }, [edges, setEdges])



    return (
        <div style={{ height: "100vh", width: "100vw" }} className="myflow" >
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
                    minZoom={0.1}
                >
                    <MiniMapStyled />
                    <ControlsStyled />
                    {children}
                </ReactFlowStyled>}
            <div id="sidebar">
                <div id="sidebar_sql_description">description : {description[nodeId] === "" ? "no description found" : description[nodeId]}</div>
                <div id="sidebar_sql_creation_date">created on :{dates[nodeId]}</div>
                <div id="sidebar_sql_table">
                    <div class="tbl-header">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>Column Name</th>
                                    <th>Datatypes</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                        <div class="tbl-content">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    {SingleTableData.map((e) => {
                                        return <tr key={e.name}>
                                            <td>{e.name}</td>
                                            <td>{e.type}</td>
                                            <td>{e.comment == null ? "----" : e.comment}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            </div>

                        </div>
                        <div id="sidebar_sql_raw"><div>raw SQL : <pre>{sql[nodeId] === "" ? "no raw sql found" : sql[nodeId]}</pre></div></div>
                        <div id="sidebar_sql_key_values"></div>
                </div>
            </div>
            );
};
            export default Flow