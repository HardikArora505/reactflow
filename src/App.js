import { ThemeProvider } from "styled-components";
import Flow from "./Flow";
import "./app.css"
import { darkTheme } from "./theme";
import { useEffect } from "react";

export default function App() {

//   useEffect(() => {

//     const fetchJson = () => {
//         // setLoading(true)
//         const data = manifest.nodes
//         const keys = Object.keys(data)
//         const s = new Set()
//         const position = { x: 0, y: 0 }
//         const nodes = keys.map((e, i) => {
//             return {
//                 id: `${i}`,
//                 position,
//                 type: "custom",
//                 data: {
//                     label: e
//                 }
//             }
//         })
//         // setNodes(nodes)
//         let nodesArray = [];
//         for (const key in data) {
//             nodesArray.push(data[key].depends_on.nodes);
//         }
//         //---------------------------------------------------------------------------------------------------------------------------------------
//         let edges = []
//         for (let i = 0; i < nodesArray.length; i++) {
//             if (nodesArray[i].length > 0) {
//                 for (let j = 0; j < nodesArray[i].length; j++) {
//                     if (!s.has(nodesArray[i][j])) {
//                         s.add(nodesArray[i][j])
//                         let k = keys.indexOf(nodesArray[i][j])
//                         if (k === -1) {
//                             continue
//                         }
//                         let p = {
//                             id: `e${i}-${k}`,
//                             source: `${i}`,
//                             target: `${k}`,
//                             style: {
//                                 strokeWidth: 2,
//                                 stroke: "#FF0072"
//                             },
//                             markerEnd: { type: "arrowclosed", color: "#ff0072", width: 30, height: 30 }
//                         }
//                         edges.push(p)
//                     }
//                 }
//                 s.clear()
//             }
//         }  // computes edges array
//         //----------------------------------------------------------------------------------------------------------------------------------------
//         // setEdges(edges)
//         setLoading(false)// will work in async call
//     }

//     fetchJson()


// }, [])
  // const [mode, setMode] = useState("light");
  // const theme = mode === "light" ? lightTheme : darkTheme;
  const theme = darkTheme;
  // const toggleMode = () => {
  //   setMode((m) => (m === "light" ? "dark" : "light"));
  // };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Flow>
          {/* <Panel position="top-left">
            <button onClick={toggleMode}>switch mode</button>
          </Panel> */}
        </Flow>
      </ThemeProvider>
      
    </div>
  );
}
