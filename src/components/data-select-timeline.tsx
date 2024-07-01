import { formatDateShortWithoutYear, getDateMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useRenderView } from "@/hooks/use-render-view";
import { DateField } from "@/types";
import { Button } from "./ui/button";
import { CompareIcon } from "./icons";


type ACC = {
  [key: string]: DateField[];
}

export function DateTimeline() {
  const { data, selectedDate, handleDateChange } = useRenderView();

  // Function to group dates by month
  const groupedDates = data.reduce((acc: ACC, dateObj) => {
    const month = getDateMonth(dateObj.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(dateObj);
    return acc;
  }, {});

  const totalDates = Object.values(groupedDates).reduce(
    (acc, datesInMonth) => acc + datesInMonth.length,
    0
  );

  return (
    <div className="w-full h-24 bg-zinc-700/80 flex">
      <div className="w-full h-full flex items-end divide-x divide-zinc-700">
        {Object.keys(groupedDates).map((month) => {
          const datesInMonth = groupedDates[month];
          const percentageWidth = (datesInMonth.length / totalDates) * 100;

          return (
            <div
              key={month}
              className="w-full justify-center items-center flex flex-col"
              style={{ flex: `1 1 ${percentageWidth}%` }}
            >
             
              {/* Dates in the month */}
              <div className="flex justify-evenly w-full">
                {datesInMonth.map((dateObj) => {
                  const { date } = dateObj;
                  const selected = selectedDate.date === date;

                  return (
                    <button
                      key={date}
                      className="flex -mb-1 z-10 flex-col w-fit items-center text-sm"
                      onClick={() => handleDateChange(dateObj)}
                    >
                      <span
                        className={cn(
                          "text-zinc-900 inline-flex font-medium p-1.5 px-2 rounded-lg text-xs",
                          {
                            "bg-blue-500 text-white": selected,
                            "bg-white hover:bg-zinc-300": !selected,
                          }
                        )}
                      >
                        {/* <span className="border-r mr-1 border-zinc-300 pr-1">
                          <CalendarIcon />
                        </span> */}
                        {formatDateShortWithoutYear(date)}
                      </span>
                      <span
                        className={cn("w-0.5 h-4 bg-zinc-300", {
                          "bg-blue-400": selected,
                        })}
                      ></span>
                      <span
                        className={cn("w-2.5 h-2.5 bg-white rounded-full", {
                          "bg-blue-400": selected,
                          "bg-zinc-200": !selected,
                        })}
                      ></span>
                    </button>
                  );
                })}
              </div>

               {/* Month */}
               <div className="h-6 w-full flex items-center text-zinc-300 border-t border-t-zinc-700 bg-zinc-900/60 text-xs font-normal justify-center space-x-1">
               <CalendarIcon />
                <span>
                {month}
                </span>
              </div>

            </div>
          );
        })}
        {/* {data.map((dateObj) => {
          const { date } = dateObj;
          const selected = selectedDate.date === date;

          return (
            <div
              key={date}
              className="w-full justify-center items-center flex flex-col"
            >
              <button
                className="flex -mb-1 z-10 flex-col w-fit items-center text-sm"
                onClick={() => handleDateChange(dateObj)}
              >
                <span
                  className={cn(
                    "text-zinc-900 inline-flex font-medium p-1.5 px-2 rounded-lg text-xs",
                    {
                      "bg-blue-500 text-white": selected,
                      "bg-white hover:bg-zinc-300": !selected,
                    }
                  )}
                >
                  <span className="border-r mr-1 border-zinc-300 pr-1">
                    <CalendarIcon />
                  </span>
                  {formatDateShort(date)}
                </span>
                <span
                  className={cn("w-0.5 h-4 bg-zinc-300", {
                    "bg-blue-400": selected,
                  })}
                ></span>
                <span
                  className={cn("w-2.5 h-2.5 bg-white rounded-full", {
                    "bg-blue-400": selected,
                    "bg-zinc-200": !selected,
                  })}
                ></span>
              </button>
              <div className="h-6 w-full flex items-center text-zinc-300 border-t border-t-zinc-700 bg-zinc-900/60 text-xs font-normal justify-center">
                {getDateMonth(date)}
              </div>
            </div>
          );
        })} */}
      </div>
      <div className="flex justify-center border-t border-l border-zinc-700 items-center px-3 bg-zinc-900">
        <Button
          // onClick={onCompare}
          className="rounded-full bg-blue-500 space-x-1"
        >
          <CompareIcon className="w-5 h-5" />
          <span>Compare</span>
        </Button>
      </div>
    </div>
  );
}

