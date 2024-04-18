import { PotreeDate } from "@/types";
import { DateTimeline } from "./data-select-timeline";
import { useState } from "react";

function organizeData(data: PotreeDate) {
  const d = data.result.flatMap((r) => {
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

  return (
    <div className="w-full h-full">
      <div className="w-full bg-[#19282c] text-gray-100 font-semibold flex items-center justify-center">
        <DateTimeline
          data={d}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
      </div>
      <div className="w-full h-full">
        <iframe
          key={selectedDate.link}
          title="iframe"
          src={selectedDate.link}
          className="w-full h-main"
        ></iframe>
      </div>
    </div>
  );
}
