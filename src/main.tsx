import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { XeokitIFCViewer, XeokitViewer } from "./components/viewer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/xeokit" element={<Xeokit />} />
        <Route path="/xeokit-ifc" element={<XeokitIFC />} />
      </Routes>
    </BrowserRouter>
  )
};

function Xeokit() {
  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <div className="relative w-full h-full min-h-screen flex flex-col">
        {/* <div className="w-full bg-zinc-950 text-gray-100 font-semibold flex flex-col items-center justify-center">
          <Navbar />
          <DateTimeline />
        </div> */}
        <div className="w-full h-main flex-grow relative">
          <XeokitViewer />
        </div>
      </div>
    </div>
  )
}

function XeokitIFC() {
  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <div className="relative w-full h-full min-h-screen flex flex-col">
        {/* <div className="w-full bg-zinc-950 text-gray-100 font-semibold flex flex-col items-center justify-center">
          <Navbar />
          <DateTimeline />
        </div> */}
        <div className="w-full h-main flex-grow relative">
          <XeokitIFCViewer />
        </div>
      </div>
    </div>
  )
}