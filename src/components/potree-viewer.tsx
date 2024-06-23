// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Camera, ZoomIn, ZoomOut } from "lucide-react";


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

  // const [pointCloudUrl, setPointcloudUrl] = useState(
  //   pointCloudUrl
  //   // "http://47.97.51.98:6093/temp/2024-02-25/J72304752/perugia/pointclouds/perugia/metadata.json"
  // );

  useEffect(() => {
    // initialize Potree viewer
    const viewerElem = potreeContainerDiv.current;

    const viewer = new Potree.Viewer(viewerElem);

    viewerRef.current = viewer; // Save viewer to ref for later use

    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    viewer.loadSettingsFromURL();

    viewer.setBackground("black");

    // viewer.setControls(viewer.orbitControls);

    console.log({ viewer });

    viewer.loadGUI(() => {
      viewer.setLanguage("en");
      // if (menuAppearance && menuAppearance.nextElementSibling) {
      //   menuAppearance.nextElementSibling.style.display = "block";
      // }
      // document.getElementById("menu_appearance").next().show();
      // document.getElementById("menu_tools").next().show();
      // document.getElementById("menu_clipping").next().show();

      // const menuAppearance = document.getElementById("menu_appearance");
      // const menuTools = document.getElementById("menu_tools");
      // const menuClipping = document.getElementById("menu_clipping");

      // if (menuAppearance && menuAppearance.nextElementSibling) {
      //   menuAppearance.nextElementSibling.style.display = "block";
      //   // z-index
      //   menuAppearance.nextElementSibling.style.zIndex = "1000";
      //   // width & height
      //   menuAppearance.nextElementSibling.style.width = "300px";
      //   menuAppearance.nextElementSibling.style.height = "auto";
      // }

      // if (menuTools && menuTools.nextElementSibling) {
      //   menuTools.nextElementSibling.style.display = "block";
      // }

      // if (menuClipping && menuClipping.nextElementSibling) {
      //   menuClipping.nextElementSibling.style.display = "block";
      // }

      // console.log("menuAppearance: ", menuAppearance, menuAppearance.nextElementSibling);
      // console.log("menuTools: ", menuTools);
      // console.log("menuClipping: ", menuClipping);

      viewer.toggleSidebar();
    });

    // Load and add point cloud to scene
    // const url = pointCloudUrl;
    // "https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.js";
    /* ***PUT YOUR POINTCLOUD URL*** HERE */
    Potree.loadPointCloud(pointCloudUrl).then(
      (e) => {
        // const scene = viewer.scene;
        const pointcloud = e.pointcloud;
        const material = pointcloud.material;

        material.activeAttributeName = "rgba";
        material.minSize = 2;
        material.pointSizeType = Potree.PointSizeType.FIXED;

        viewer.scene.addPointCloud(pointcloud);
        viewer.fitToScreen();
        // addMeasurementTool(viewer);

        // console.log("This is the url", pointCloudUrl);
      },
      (e) => console.err("ERROR: ", e)
    );

    // const addMeasurementTool = (viewer) => {
    //   const measure = new Potree.Measure();
    //   measure.showDistances = true;
    //   measure.showCoordinates = true;
    //   measure.showAngles = true;
    //   measure.showArea = true;
    //   measure.showHeight = true;
    //   viewer.scene.addMeasurement(measure);

    //   viewer.scene.addEventListener('measurement_added', (event) => {
    //     const measurement = event.measurement;
    //     console.log('Measurement added:', measurement);
    //   });

    //   // Adding initial measurements (optional)
    //   const pointA = new THREE.Vector3(0, 0, 0);
    //   const pointB = new THREE.Vector3(10, 0, 0);
    //   measure.addMarker(pointA);
    //   measure.addMarker(pointB);
    // };

    const camera = viewer.scene.getActiveCamera();
    const renderer = viewer.renderer;
    const orbitControls = new Potree.OrbitControls(camera, renderer.domElement);
    orbitControlsRef.current = orbitControls; // Save orbitControls to ref for later use

    return () => {
      // Cleanup
      console.log("Disposing viewer:", viewer);
      if (viewer && typeof viewer.dispose === "function") {
        viewer.dispose();
      } else {
        console.error("Viewer dispose method not found or viewer is null");
      }
      // viewer.dispose();
      // while (viewerElem.firstChild) {
      //   viewerElem.removeChild(viewerElem.firstChild);
      // }
    };
    // return () => {
    //   // cleanup
    //   viewer.dispose();
    // };
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

  // // Function to zoom in
  // function zoomIn() {
  //   const viewer = potreeContainerDiv.current;
  //   if (viewer) {
  //     const camera = viewer.scene.getActiveCamera();
  //     console.log("camera: ", camera)
  //     camera.zoomIn();
  //     viewer.setFOV(camera.fov / 1.1);
  //   }
  // }

  // // Function to zoom out
  // function zoomOut(){
  //   const viewer = potreeContainerDiv.current;
  //   if (viewer) {
  //     const camera = viewer.scene.getActiveCamera();
  //     console.log("camera: ", camera)
  //     camera.zoomOut();
  //     viewer.setFOV(camera.fov * 1.1);
  //   }
  // };

  // // Function to zoom in
  // const zoomIn = () => {
  //   const orbitControls = orbitControlsRef.current;
  //   console.log("dd: ", orbitControls);
  //   if (orbitControls) {
  //     orbitControls.dollyIn(0.95);
  //     orbitControls.update();
  //   }
  // };

  // // Function to zoom out
  // const zoomOut = () => {
  //   const orbitControls = orbitControlsRef.current;
  //   console.log("dd: ", orbitControls);
  //   if (orbitControls) {
  //     orbitControls.dollyOut(0.95);
  //     orbitControls.update();
  //   }
  // };

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
          {/* actions */}
          {!disableActions ? (
            <div className="absolute bg-primary rounded flex gap-x-1  bottom-4 right-4 z-20">
              <Button
                title="Capture Screenshot"
                onClick={captureScreenshot}
                // className="bg-blue-500 text-white"
                size="icon"
              >
                <Camera className="w-[22px] h-[22px]" />
              </Button>
              <Button
                title="Zoom In"
                onClick={zoomIn}
                // className="bg-blue-500 text-white"
                size="icon"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                title="Zoom Out"
                onClick={zoomOut}
                // className="bg-blue-500 text-white"
                size="icon"
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
