import { useState } from "react";
import "./App.css";
import { useData } from "./hooks/useData";

function App() {
  const [page, setPage] = useState(2);

  const { results, isLoading, pagination } = useData(page);

  console.log(
    "result: ",
    results,
    "\n",
    "loading: ",
    isLoading,
    "\n",
    "pagination: ",
    pagination
  );

  return <main>hello world</main>;
}

export default App;
