import { PotreeDate } from "@/types";
import { DateTimeline } from "./data-select-timeline";
import { useEffect, useState } from "react";
import PointcloudNavigator from "./potree-viewer";

function organizeData(data: PotreeDate) {
  const d = data.resultTest.flatMap((r) => {
    return Object.entries(r).map(([key, value]) => {
      return { date: key, link: value };
    });
  });

  return d;
}

interface DataShowcaseProps {
  data: PotreeDate;
}

export default function DataView({ data }: DataShowcaseProps) {
  const d = organizeData(data);

  const [selectedDate, setSelectedDate] = useState(d[0]);

  const handleDateChange = (date: { date: string; link: string }) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (window && window.viewer) {
      console.log("window: ", window.viewer);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
       <div className="w-full bg-zinc-950 text-gray-100 font-semibold flex items-center justify-center">
        <DateTimeline
          data={d}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
      </div> 
      <div className="w-full h-full flex-grow relative">
      <div className="absolute top-0 right-0 bottom-0 w-80 h-full bg-zinc-800/80 z-50 flex justify-center items-center">
        <div className="flex w-full max-w-72 text-center flex-col items-center gap-4 text-white -mt-20">
          {/* <MousePointer className="w-10 h-10 text-white" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mouse-pointer rotate-12"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
          <p className="text-sm">Select an object to view its properties or modify it.</p>
        </div>
      </div>
        <PointcloudNavigator pointCloudUrl={selectedDate.link} />
        {/* <iframe
          key={selectedDate.link}
          title="iframe"
          src={selectedDate.link}
          className="w-full h-main"
        ></iframe> */}
      </div>
    </div>
  );
}
