import { useState } from "react";
import { render } from "react-dom";
import style from "./index.scss";

function App() {
  const [state, setState] = useState("CLICK ME");

  return (
    <button className={style.btn} onClick={() => setState("CLICKED")}>
      {state}
    </button>
  );
}

render(<App />, document.getElementById("root"));
