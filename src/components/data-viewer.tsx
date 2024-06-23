import { PotreeDate } from "@/types";
import { DateTimeline } from "./data-select-timeline";
import { RenderViewProvider } from "@/context/render-view";
import { Viewer } from "./viewer";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { ShareDialog } from "./share-dialog";
import { useRenderView } from "@/hooks/use-render-view";
import { formatDate } from "@/lib/date";

type DataViewProps = {
  data: PotreeDate;
}

export default function DataView({ data }: DataViewProps) {
  return (
    <RenderViewProvider data={data}>
      <div className="relative w-full h-full min-h-screen flex flex-col">
        <div className="w-full bg-zinc-950 text-gray-100 font-semibold flex flex-col items-center justify-center">
          <Navbar />
          <DateTimeline />
        </div>
        <Viewer />
      </div>
    </RenderViewProvider>
  );
}

function Navbar() {
  const { selectedDate } = useRenderView();

  return (
    <div className="w-full bg-zinc-900/90 flex items-center px-4 h-14">
      <div className="text-sm flex items-center gap-x-4 w-full h-full">
        <div className="flex items-center gap-x-1">
          <img
            src="/favicon.ico"
            width={35}
            height={35}
            className="object-contain"
          />
          {/* <h1 className="font-extralight uppercase pb-0.5">
            CraneCam<span className="font-medium lowercase">cloud</span>
          </h1> */}
        </div>
        <div className="h-8 bg-zinc-800 w-0.5"></div>
        <div className="h-full flex items-center gap-x-1.5">
          <p>Construction site</p>
          <ChevronRight className="w-5" />
          <p className="font-normal inline-flex items-center gap-x-2">
            <span>
              <CalendarIcon className="w-4" />
            </span>
            {formatDate(selectedDate.date)}{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <ShareDialog />
        {/* <Button>
        <span className="flex items-center gap-x-2">
          <Share2 className="w-[17px]" />
          <span>Share</span>
        </span>
      </Button> */}
      </div>
    </div>
  );
}
