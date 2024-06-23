import { DateField, PotreeDate } from "@/types";
import { createContext, useState } from "react";

type RenderViewContextType = {
  data: DateField[];
  selectedDate: DateField;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateField>>;
  handleDateChange: (date: DateField) => void;
  compareMode: boolean;
  setCompareMode: React.Dispatch<React.SetStateAction<boolean>>;
  compareDates: PotreeDate[];
  setCompareDates: React.Dispatch<React.SetStateAction<PotreeDate[]>>;
  onCompare: () => void;
  onExitCompare: () => void;
};

function organizeData(data: PotreeDate) {
  const d = data.resultTest.flatMap((r) => {
    return Object.entries(r).map(([key, value]) => {
      return { date: key, link: value };
    });
  });

  return d;
}

export const RenderViewContext = createContext<RenderViewContextType | null>(
  null
);

export function RenderViewProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PotreeDate;
}) {
  const processedData = organizeData(data);

  const [selectedDate, setSelectedDate] = useState(processedData[0]);

  const handleDateChange = (date: DateField) => {
    setSelectedDate(date);
  };

  const [compareMode, setCompareMode] = useState(false);

  const [compareDates, setCompareDates] = useState<PotreeDate[]>([]);

  function onCompare() {
    console.log("compare");
    setCompareMode(true);
    // const firstDate = selectedDate;
    // const secondDate = processedData[1];
    // setCompareDates(compareDates.concat({ firstDate, secondDate }));
  }

  function onExitCompare() {
    setCompareMode(false);
    setCompareDates([]);
  }

  return (
    <RenderViewContext.Provider
      value={{
        data: processedData,
        selectedDate,
        setSelectedDate,
        handleDateChange,
        compareMode,
        setCompareMode,
        compareDates,
        setCompareDates,
        onCompare,
        onExitCompare,
      }}
    >
      {children}
    </RenderViewContext.Provider>
  );
}
