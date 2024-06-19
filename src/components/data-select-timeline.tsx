import { formatDateShort, getDateMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

export function DateTimeline({
  data,
  handleDateChange,
  selectedDate,
}: {
  data: { date: string; link: string }[];
  handleDateChange: (date: { date: string; link: string }) => void;
  selectedDate: { date: string; link: string };
}) {
  return (
    <div className="w-full h-24 bg-zinc-700 flex flex-col">
      <div className="w-full h-full flex items-end border-zinc-600 border-b divide-x divide-zinc-700">
        {data.map((dateObj) => {
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
                  className={cn("w-0.5 h-5 bg-zinc-300", {
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
              <div className="h-6 w-full flex items-center text-zinc-300 border-t border-t-zinc-700 bg-zinc-800 text-xs font-normal justify-center">
                {getDateMonth(date)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
