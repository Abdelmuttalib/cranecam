import useSWR from "swr";
import { apiPaths, getPotreeDate } from "./lib/api";
import DataView from "./components/data-viewer";

// #242424

function App() {
  const { data } = useSWR(apiPaths.getPotreeDate, getPotreeDate);

  console.log(data);

  return (
    <div className="w-full min-h-screen bg-[#131f22]">
      {data && <DataView data={data} />}
    </div>
  );
}

export default App;
