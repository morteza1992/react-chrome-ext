import "./App.css";
import DefaultView from "./components/default-view/DefaultView";
import Microphone from "./components/live-transcription/Microphone";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("default");
  return (
    <div>
      {mode === "default" && (
        <DefaultView onClick={() => setMode("microphone")} />
      )}
      {mode === "microphone" && <Microphone />}
    </div>
  );
}

export default App;
