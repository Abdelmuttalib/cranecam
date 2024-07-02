// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Camera, MousePointer, ZoomIn, ZoomOut } from "lucide-react";
import { Input } from "./ui/input";
import { IFCLoader } from '../../public/libs/three.js/extra/IFCLoader.js'; // Adjust path as needed

type PointcloudNavigatorProps = {
  pointCloudUrl: string;
  disableActions: boolean;
};

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;
console.log("Potree: ", Potree);

export default function PointcloudNavigator({
  pointCloudUrl,
  disableActions,
}: PointcloudNavigatorProps) {
  const potreeContainerDiv = useRef();

  const viewerRef = useRef(null);
  const orbitControlsRef = useRef(null);

  useEffect(() => {
    // initialize Potree viewer
    console.log('viewerElem', viewerElem);

    const viewerElem = potreeContainerDiv.current;

    const viewer = new Potree.Viewer(viewerElem);

    viewerRef.current = viewer; // Save viewer to ref for later use

    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    viewer.loadSettingsFromURL();

    viewer.setBackground("black");

    const handleClick = (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, viewer.scene.getActiveCamera());

      const intersects = raycaster.intersectObjects(
        viewer.scene.scenePointClouds
      );
      if (intersects.length > 0) {
        const intersect = intersects[0];
        addAnnotation(intersect.point, "New Annotation", "Description");
      }
    };

    // Function to add annotation
    const addAnnotation = (position, title, description) => {
      const annotation = new Potree.Annotation({
        position: position,
        title: title,
        description: description,
        cameraPosition: viewer.scene.view.position.clone(),
        cameraTarget: position.clone(),
      });
      viewer.scene.annotations.add(annotation);
      saveAnnotation(annotation);
    };


    console.log({ viewer });

    viewer.loadGUI(() => {
      viewer.setLanguage("en");

      viewer.toggleSidebar();
    });

    let relevantPosition = {};

    // Load and add point cloud to scene
    // const url = pointCloudUrl;
    // "https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.js";
    // Potree.loadPointCloud(pointCloudUrl).then(
    //   (e) => {
    //     // const scene = viewer.scene;
    //     const pointcloud = e.pointcloud;
    //     const material = pointcloud.material;
    //     console.log("Material: ", pointcloud);

    //     material.activeAttributeName = "rgba";
    //     material.minSize = 2;
    //     material.pointSizeType = Potree.PointSizeType.FIXED;

    //     viewer.scene.addPointCloud(pointcloud);
    //     console.log("viewer scene: ", viewer.scene);
    //     if (viewer.scene.pointclouds?.[0]?.position) {
    //       relevantPosition = viewer.scene.pointclouds?.[0]?.position;
    //     }

    //     viewer.fitToScreen();
    //     // addMeasurementTool(viewer);

    //     // console.log("This is the url", pointCloudUrl);
    //   },
    //   (e) => console.err("ERROR: ", e)
    // );

    const ifcModelPath = '../../public/Project1.ifc';
    const ifcLoader = new IFCLoader();
    // ifcLoader.ifcManager.setWasmPath('./libs/three.js/extra/ifc/');
    ifcLoader.ifcManager.setWasmPath('../../public/libs/three.js/extra/ifc/');
    ifcLoader.load(ifcModelPath, function (model) {
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
      // viewer.scene.add(model.mesh);
      // viewer.scene.scene.add(model.mesh);
    });

    // const ifcLoader = new IFCLoader();
    // ifcLoader.ifcManager.setWasmPath('./libs/three.js/extra/ifc/');
    // ifcLoader.load('./Project1.ifc', function (model) {
    //   console.log("model: ", model);
    //   const pointCloud = viewer.scene.pointclouds[0]; // Adjust as per your viewer setup
    //   const pointCloudBoundingBox = pointCloud.pcoGeometry.tightBoundingBox;

    //   // Calculate the center of the point cloud bounding box
    //   const pointCloudCenter = pointCloudBoundingBox.getCenter(new THREE.Vector3());

    //   // Set the position of the IFC model relative to the point cloud
    //   ifcModel.mesh.position.copy(pointCloudCenter);
    //   ifcModel.mesh.position.x += pointCloudBoundingBox.max.x - pointCloudCenter.x + 1; // Example offset adjustment
    //   // model.position = { x: 100, y: 100, z: 100, isVector: false };
    //   model.mesh.rotateX(Math.PI * 0.5);
    //   // model.scale.multiplyScalar(0.3048);
    //   scene.add(model.mesh);
    // });

    const camera = viewer.scene.getActiveCamera();
    const renderer = viewer.renderer;
    const orbitControls = new Potree.OrbitControls(camera, renderer.domElement);
    orbitControlsRef.current = orbitControls; // Save orbitControls to ref for later use

    function addMarker(position, radius) {
      const geometry = new THREE.SphereGeometry(1, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const marker = new THREE.Mesh(geometry, material);
      // scene.add(sphere);
      marker.position.copy(position);

      marker.userData.onClick = (e) => {
        console.log("Marker clicked!", position, e);
        // Add your custom actions here

        // const clickedMarkerData = coordinatesData.find(
        //   (coord) =>
        //     coord.x === position.x &&
        //     coord.y === position.y &&
        //     coord.z === position.z
        // );
      };

      marker.addEventListener("mouseleave", () => {
        console.log("Marker unhovered!", position);
        // Add your custom actions here for mouse leave
        // setShow(false);
      });

      // marker.addEventListener('mouseout', () => {
      //   console.log('Marker unhovered!', position);
      //   // Add your custom actions here for mouse leave
      // });

      // window.viewer.inputHandler.registerInteractiveMarker(marker);
      // marker.lookAt(window.viewer.scene.getActiveCamera().position);
      window.viewer.scene.scene.add(marker);
    }

    // Function to handle click events
    function onClick(event) {
      event.preventDefault();

      console.log("click event: ", event);

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, viewer.scene.getActiveCamera());


      const intersects = raycaster.intersectObjects(
        viewer.scene.scene.children,
        true
      );

      if (intersects.length > 0) {
        const intersect = intersects[0];
        addMarker(intersect.point, 1);
      }


      // viewer.renderer.domElement.addEventListener("click", onClick, false);

      return () => {
        // Cleanup
        // viewer.removeEventListener("click", handleClick);
        console.log("Disposing viewer:", viewer);
        if (viewer && typeof viewer.dispose === "function") {
          viewer.dispose();
        } else {
          console.error("Viewer dispose method not found or viewer is null");
        }
      };
    }

  }, [pointCloudUrl]);

  // Function to capture and download screenshot
  function captureScreenshot() {
    const viewerElem = potreeContainerDiv.current;
    const canvas = viewerElem.querySelector("canvas");

    if (canvas) {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = image;
      link.download = "construction_site_screenshot.png";
      link.click();
    }
  }

  // Function to zoom in
  function zoomIn() {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.controls.radiusDelta = -3; // Adjust this value as needed
    }
  }

  // Function to zoom out
  function zoomOut() {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.controls.radiusDelta = 3; // Adjust this value as needed
    }
  }

  return (
    <>
      <div id="potree-root" className="w-full h-full">
        {/*<div className="absolute top-0 right-0 w-72 h-72 z-50 border">
      <div id="scene_export"></div>
      </div>*/}

        <div className="potree_container bg-black flex h-full flex-col relative">
          <div id="potree_render_area" ref={potreeContainerDiv}></div>
          <div className="absolute bg-zinc-900/90 rounded-full overflow-hidden py-0.5 flex flex-col gap-x-1 top-4 right-[25rem] z-20">
            <Button
              title="Capture Screenshot"
              onClick={captureScreenshot}
              // className="bg-blue-500 text-white"
              size="icon"
              className="bg-transparent"
            >
              <MousePointer className="w-[20px] h-[20px] rotate-[18deg]" />
            </Button>
            <Button
              title="Zoom In"
              onClick={zoomIn}
              // className="bg-blue-500 text-white"
              size="icon"
              className="bg-transparent"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
                xmlns="http://www.w3.org/2000/svg"
                fit=""
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path d="M19 2a3.003 3.003 0 0 0-3 3c.003.458.112.91.319 1.319l-.026-.026-10 10 .026.026A2.962 2.962 0 0 0 5 16a3 3 0 1 0 3 3 2.963 2.963 0 0 0-.319-1.319l.026.026 10-10-.026-.026c.41.207.86.316 1.319.319a3 3 0 1 0 0-6ZM5 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM19 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
              </svg>
            </Button>
            <Button
              title="Zoom Out"
              onClick={zoomOut}
              // className="bg-blue-500 text-white"
              size="icon"
              className="bg-transparent"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
                xmlns="http://www.w3.org/2000/svg"
                fit=""
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path d="M20 16.184V7.816A2.992 2.992 0 1 0 16.184 4H7.816A2.993 2.993 0 1 0 4 7.816v8.368A2.992 2.992 0 1 0 7.816 20h8.368A2.993 2.993 0 1 0 20 16.184ZM16.184 18H7.816A2.995 2.995 0 0 0 6 16.184V7.816A2.996 2.996 0 0 0 7.816 6h8.368A2.997 2.997 0 0 0 18 7.816v8.368A2.996 2.996 0 0 0 16.184 18ZM19 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm14 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
              </svg>
            </Button>
            <Button
              title="Zoom Out"
              onClick={zoomOut}
              // className="bg-blue-500 text-white"
              size="icon"
              className="bg-transparent"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
                xmlns="http://www.w3.org/2000/svg"
                fit=""
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path d="M19.5 9.05a9 9 0 1 0 0 5.9 3 3 0 0 0 0-5.9ZM19 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-8 6a7 7 0 1 1 6.5-9.58 3 3 0 0 0 0 5.16A7 7 0 0 1 11 19Z"></path>
              </svg>
            </Button>
            <Button
              title="Zoom Out"
              onClick={zoomOut}
              // className="bg-blue-500 text-white"
              size="icon"
              className="bg-transparent"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
                xmlns="http://www.w3.org/2000/svg"
                fit=""
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path d="M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"></path>
              </svg>
            </Button>
            {/* <Button
              title="Zoom Out"
              onClick={zoomOut}
              // className="bg-blue-500 text-white"
              size="icon"
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19.5 9.05a9 9 0 1 0 0 5.9 3 3 0 0 0 0-5.9ZM19 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-8 6a7 7 0 1 1 6.5-9.58 3 3 0 0 0 0 5.16A7 7 0 0 1 11 19Z"></path></svg>
            </Button> */}
          </div>
          {/* right */}
          <div className="absolute flex gap-x-1 top-0 h-full w-96 bottom-0 right-0 z-20 ">
            <div className="bg-zinc-900/90 text-white space-y-3 p-4 py-5 w-full">
              <div className="flex items-center gap-x-2">
                <svg
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fit=""
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path d="M13 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2l3 3 3-3h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"></path>
                </svg>
                <span className="text-lg font-medium">Add Annotation</span>
              </div>
              {/* annotation */}
              <div className="space-y-3 py-3 px-1">
                <Card />
              </div>
            </div>
          </div>
          {/* left */}
          <div className="absolute flex gap-x-1 top-0 h-full w-72 bottom-0 left-0 z-20 ">
            <div className="bg-zinc-900/90 text-white space-y-3 p-4 w-full">
              <div className="flex items-center gap-x-2">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fit=""
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path d="m12 18.54-7.38-5.73L3 14.07l9 7 9-7-1.63-1.27L12 18.54ZM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16Z"></path>
                </svg>
                <span className="text-lg">Layers</span>
              </div>
              {/* annotation */}
              <div className="space-y-3 py-6 px-1">
                <div className="flex items-center gap-x-2 text-zinc-200">
                  <input type="checkbox" className="w-6 h-6" />
                  <svg
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fit=""
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path d="M13 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2l3 3 3-3h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"></path>
                  </svg>
                  <span>Annotations</span>
                </div>
                <div className="flex items-center gap-x-2 text-zinc-200">
                  <input type="checkbox" className="w-6 h-6" />
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fit=""
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Z"></path>
                    <path d="m14.55 14.88-.51-1-.76-1.41A2 2 0 0 0 14 11a2 2 0 0 0-2-2V7h-1v2.28A2 2 0 0 0 10 11a2 2 0 0 0 .69 1.5l-.76 1.4-.51.95L8 17.49l.44 1.35 1.8-3.33a3.41 3.41 0 0 0 3.49 0l1.79 3.31.48-1.33-1.45-2.61ZM12 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 5a2.49 2.49 0 0 1-1.29-.37l.91-1.63c.126.015.254.015.38 0h.35l.91 1.68A2.46 2.46 0 0 1 12 15Z"></path>
                  </svg>
                  <span>Overlays</span>
                </div>
                <div className="flex items-center gap-x-2 text-zinc-200">
                  <input type="checkbox" className="w-6 h-6" />
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fit=""
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Z"></path>
                    <path d="m14.55 14.88-.51-1-.76-1.41A2 2 0 0 0 14 11a2 2 0 0 0-2-2V7h-1v2.28A2 2 0 0 0 10 11a2 2 0 0 0 .69 1.5l-.76 1.4-.51.95L8 17.49l.44 1.35 1.8-3.33a3.41 3.41 0 0 0 3.49 0l1.79 3.31.48-1.33-1.45-2.61ZM12 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 5a2.49 2.49 0 0 1-1.29-.37l.91-1.63c.126.015.254.015.38 0h.35l.91 1.68A2.46 2.46 0 0 1 12 15Z"></path>
                  </svg>
                  <span>Outputs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute rounded flex gap-x-1 bottom-4 left-80 z-20">
            <div className="bg-blue-400/40 text-white p-1 rounded-lg">
              <span>3D</span>
            </div>
          </div>
          {/* actions */}
          {!disableActions ? (
            <div className="absolute bg-zinc-900/90 rounded-full overflow-hidden px-1 flex gap-x-1 bottom-4 left-[23rem] z-20">
              <Button
                title="Capture Screenshot"
                onClick={captureScreenshot}
                // className="bg-blue-500 text-white"
                size="icon"
                className="bg-transparent"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[22px] h-[22px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fit=""
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  <path d="M20 5h-3.17L15 3H9L7.17 5H4a2.006 2.006 0 0 0-2 2v12a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V7a2.006 2.006 0 0 0-2-2Zm-8 13a5 5 0 1 1 0-9.999A5 5 0 0 1 12 18Z"></path>
                </svg>
              </Button>
              <Button
                title="Capture Screenshot"
                onClick={captureScreenshot}
                // className="bg-blue-500 text-white"
                size="icon"
                className="bg-transparent"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-[22px] h-[22px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fit=""
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path d="M8 2 5.836 7h4.328L8 2Z"></path>
                  <path d="M10.597 8h-1.09l1.931 4.46-3.052-1.277L8 11.021l-.386.162-3.052 1.277L6.493 8h-1.09L3 13.552l.473.448L8 12.105 12.527 14l.473-.448L10.597 8Z"></path>
                </svg>
              </Button>

              <Button
                title="Zoom In"
                onClick={zoomIn}
                // className="bg-blue-500 text-white"
                size="icon"
                className="bg-transparent"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                title="Zoom Out"
                onClick={zoomOut}
                // className="bg-blue-500 text-white"
                size="icon"
                className="bg-transparent"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
            </div>
          ) : null}
          {/* <div id="potree_sidebar_container" className=""></div> */}
        </div>
      </div>
    </>
  );
}

function Card() {
  return (
    <div className="">
      <div className="w-full transform overflow-hidden rounded-2xl text-left">
        {/* <h3 className="text-lg font-medium leading-6 text-white">
          Add Annotation
        </h3> */}
        <div className="mt-6 flex flex-col items-center gap-y-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
          />
          <div className="flex justify-end w-full">
            <Button
              //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
              variant="outline"
              className="space-x-1.5 active:bg-zinc-400 text-black"
            >
              <span>Submit</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {/* <Button
            >
              Close
            </Button> */}
        </div>
      </div>
    </div>
  );
}
