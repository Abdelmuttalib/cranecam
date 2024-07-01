import useSWR from "swr";
import { apiPaths, getPotreeDate } from "./lib/api";
import DataView from "./components/data-viewer";
import { Test } from "./components/test";

// #242424
// #131f22

function App() {
  const { data } = useSWR(apiPaths.getPotreeDate, getPotreeDate);

  // console.log(data);

  return (
    <div className="w-full min-h-screen bg-zinc-950">
      {/* <PointcloudNavigator /> */}
      {data && <DataView data={data} />}
      {/* <Test /> */}
    </div>
  );
}

export default App;
