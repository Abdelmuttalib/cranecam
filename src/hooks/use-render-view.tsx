import { RenderViewContext } from "@/context/render-view";
import { useContext } from "react";

export function useRenderView() {
  const context = useContext(RenderViewContext);
  if (!context) {
    throw new Error("useRenderView must be used within a RenderViewProvider");
  }

  return context;
}
