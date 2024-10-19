import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JobCandidatesTable from "./JobCandidatesTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <JobCandidatesTable />
    </>
  );
}

export default App;
