import { ThemeProvider } from "styled-components";
import Flow from "./Flow";
import "./app.css"
import { darkTheme } from "./theme";

export default function App() {
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
      <div className="sidebar">
      </div>
    </div>
  );
}
