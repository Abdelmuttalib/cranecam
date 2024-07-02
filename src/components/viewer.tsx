import PointcloudNavigator from "./potree-viewer";
import { useRenderView } from "@/hooks/use-render-view";

export function Viewer() {
  const { selectedDate, compareMode } = useRenderView();

  return (
    <div className="w-full h-main flex-grow relative">
      {/* <IFCViewer /> */}
      {/* <THREE ifcURL="./Project1.ifc" /> */}
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

import * as React from 'react';

// import IFCLoader from '../../public/libs/threejs/extra/IFCLoader.js'; // Adjust path as needed
import { IFCLoader } from '../../public/libs/three.js/extra/IFCLoader.js'; // Adjust path as needed


function IFCViewer() {
  const potreeContainerDiv = React.useRef();
  const viewerRef = React.useRef(null);
  const orbitControlsRef = React.useRef(null);


  React.useEffect(() => {

    const viewerElem = potreeContainerDiv.current;

    const viewer = new Potree.Viewer(viewerElem);

    viewerRef.current = viewer; // Save viewer to ref for later use

    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    viewer.loadSettingsFromURL();

    viewer.setBackground("black");

    const ifcLoader = new IFCLoader();
    // ifcLoader.ifcManager.setWasmPath('./libs/three.js/extra/ifc/');
    ifcLoader.ifcManager.setWasmPath('../../public/libs/three.js/extra/ifc/');
    ifcLoader.load('./Project1.ifc', function (model) {
      console.log("model: ", model);
      // const pointCloud = viewer.scene.pointclouds[0]; // Adjust as per your viewer setup
      // const pointCloudBoundingBox = pointCloud.pcoGeometry.tightBoundingBox;

      // Calculate the center of the point cloud bounding box
      // const pointCloudCenter = pointCloudBoundingBox.getCenter(new THREE.Vector3());

      // Set the position of the IFC model relative to the point cloud
      // ifcModel.mesh.position.copy(pointCloudCenter);
      // ifcModel.mesh.position.x += pointCloudBoundingBox.max.x - pointCloudCenter.x + 1; // Example offset adjustment
      // model.position = { x: 100, y: 100, z: 100, isVector: false };
      // model.mesh.rotateX(Math.PI * 0.5);
      // model.scale.multiplyScalar(0.3048);
      // scene.add(model.mesh);
      console.log("S", viewer.scene);
      viewer.scene.scene.add(model.mesh);
    });

    console.log("a", viewerElem);

  }, [])

  return (
    <div className="w-screen h-[90vh]">
      <div id="potree-root" className="w-full h-full">
        {/*<div className="absolute top-0 right-0 w-72 h-72 z-50 border">
      <div id="scene_export"></div>
      </div>*/}

        <div className="potree_container bg-black flex h-full flex-col relative">
          <div id="potree_render_area" ref={potreeContainerDiv}></div>
        </div>
      </div>
    </div>
  )
};