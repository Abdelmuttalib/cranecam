import PointcloudNavigator from "./potree-viewer";
import { useRenderView } from "@/hooks/use-render-view";

export function Viewer() {
  const { selectedDate, compareMode } = useRenderView();

  return (
    <div className="w-full h-main flex-grow relative">
      {compareMode ? (
        <div className="w-full h-full grid grid-cols-2 divide-x-2 divide-zinc-900">
          <PointcloudNavigator pointCloudUrl={selectedDate.link} disableActions={compareMode} />
          <PointcloudNavigator pointCloudUrl={selectedDate.link} disableActions={compareMode} />
        </div>
      ) : (
        <>
       
          <PointcloudNavigator pointCloudUrl={selectedDate.link} disableActions={compareMode} />
        </>
      )}

      {/* right sidebar */}
      {/* <div className="absolute top-0 right-0 bottom-0 w-80 h-full bg-zinc-800/80 z-50 flex justify-center items-center">
          <div className="flex w-full max-w-72 text-center flex-col items-center gap-4 text-white -mt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-mouse-pointer rotate-12"
            >
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="m13 13 6 6" />
            </svg>
            <p className="text-sm">
              Select an object to view its properties or modify it.
            </p>
          </div>
        </div> */}
    </div>
  );
}
