import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";
import { useState } from "react";
import { setLocalStorage } from "util/CommonUtil";

const MODES = [
  {
    label: "Dark",
    value: "DARK",
  },
  {
    label: "Light",
    value: "LIGHT",
  },
  {
    label: "System",
    value: "SYSTEM",
  },
];

function PageMode() {
  const [mode, setMode] = useState(localStorage.theme ?? "SYSTEM");

  const handleChange = (e: any) => {
    setMode(e.value);
    if (e.value === "DARK") {
      document.documentElement.classList.add("dark");
      setLocalStorage("theme", "DARK");
    }
    if (e.value === "LIGHT") {
      document.documentElement.classList.remove("dark");
      setLocalStorage("theme", "LIGHT");
    }
    if (e.value === "SYSTEM") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.removeItem("theme");
    }
  };

  return (
    <div>
      <h1>Select Mode</h1>
      <div>
        <SimpleDropDown options={MODES} onChange={handleChange} value={mode} />
      </div>
    </div>
  );
}

export default PageMode;
