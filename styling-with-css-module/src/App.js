import "./App.css";
import CheckBox from "./components/CheckBox";
import React, { useState } from "react";

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <CheckBox checked={check} onChange={onChange}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>Check:</b> {check ? "true" : "false"}
      </p>
    </div>
  );
}

export default App;
