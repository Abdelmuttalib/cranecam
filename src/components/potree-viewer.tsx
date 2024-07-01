// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Camera, MousePointer, ZoomIn, ZoomOut } from "lucide-react";
import { Input } from "./ui/input";

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

    // // Example usage of addAnnotation
    // // addAnnotation(new THREE.Vector3(1, 2, 3), "Example Title", "Example Description");

    // // Function to save annotation
    // const saveAnnotation = (annotation) => {
    //   const savedAnnotations = JSON.parse(
    //     localStorage.getItem("annotations") || "[]"
    //   );
    //   savedAnnotations.push({
    //     title: annotation.title,
    //     description: annotation.description,
    //     position: annotation.position.toArray(),
    //     cameraPosition: annotation.cameraPosition.toArray(),
    //     cameraTarget: annotation.cameraTarget.toArray(),
    //   });
    //   localStorage.setItem("annotations", JSON.stringify(savedAnnotations));
    // };

    // // Load saved annotations
    // const loadAnnotations = () => {
    //   const savedAnnotations = JSON.parse(
    //     localStorage.getItem("annotations") || "[]"
    //   );
    //   savedAnnotations.forEach((ann) => {
    //     const annotation = new Potree.Annotation({
    //       position: new THREE.Vector3().fromArray(ann.position),
    //       title: ann.title,
    //       description: ann.description,
    //       cameraPosition: new THREE.Vector3().fromArray(ann.cameraPosition),
    //       cameraTarget: new THREE.Vector3().fromArray(ann.cameraTarget),
    //     });
    //     viewer.scene.annotations.add(annotation);
    //   });
    // };

    // loadAnnotations();

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

    function addMarker(position, radius) {
      // const geometry = new THREE.CircleGeometry(radius, 32);
      //           const geometry = `<div style="color: white;
      //           background-color: black;
      //           opacity: 0.5;
      //           border-radius: 1.5em;
      //           font-size: 1em;
      //           line-height: 1.5em;
      //           padding: 1px 8px 0px 8px;
      //           font-weight: bold;
      //           display: flex;
      //           cursor: default;">
      // </div>`;
      //           const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color
      //           const marker = new THREE.Mesh(geometry, material);
      const geometry = new THREE.SphereGeometry(1, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const marker = new THREE.Mesh(geometry, material);
      // scene.add(sphere);
      marker.position.copy(position);

      // marker.addEventListener('click', (e) => {
      //   // Perform actions when the marker is clicked
      //   console.log('Marker clicked!', position, e);
      //   // Add your custom actions here
      // });
      // Register a click event for the marker
      // marker.callback = (e) => {
      //   console.log('Marker clicked!', position, e);
      //   // Add your custom actions here
      // };
      marker.userData.onClick = (e) => {
        console.log("Marker clicked!", position, e);
        // Add your custom actions here

        // const clickedMarkerData = coordinatesData.find(
        //   (coord) =>
        //     coord.x === position.x &&
        //     coord.y === position.y &&
        //     coord.z === position.z
        // );

        // console.log('clickedMarkerData: ', clickedMarkerData);

        // if (clickedMarkerData) {
        //   const img = clickedMarkerData.imageName.replace('.jpg', '');
        //   const defectData = annotationsDefectsData[img];
        // }
      };

      // // Add event listeners for mouseenter and mouseleave events
      // marker.addEventListener('mouseenter', () => {
      //   console.log('Marker hovered!', position);
      //   // Add your custom actions here for mouse enter
      // });

      // marker.addEventListener('mouseleave', () => {
      //   console.log('Marker unhovered!', position);
      //   // Add your custom actions here for mouse leave
      // });

      // Register hover events for the marker
      marker.addEventListener("mouseover", () => {
        // console.log('Marker hovered!', position);
        // Add your custom actions here for mouse enter
        // setShow(true);
        // const clickedMarkerData = coordinatesData.find(
        //   (coord) =>
        //     coord.x === position.x &&
        //     coord.y === position.y &&
        //     coord.z === position.z
        // );
        // console.log('clickedMarkerData: ', clickedMarkerData);
        // if (clickedMarkerData) {
        //   const img = clickedMarkerData.imageName.replace('.jpg', '');
        //   const defectData = annotationsDefectsData[img];
        //   setMarkerData(defectData);
        // }
      });

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

      // for (let i = 0; i < intersects.length; i++) {
      //   const object = intersects[i].object;
      //   if (object.userData.onClick) {
      //     object.userData.onClick();
      //     break;
      //   }
      // }
    }

    //     You'll need to add a click listener to viewer.renderer.domElement and then do a raycast to viewer.scene.scene (scene: potree scene, scene.scene: the threejs scene in a potree scene) to check whether a mesh has been hit.

    // Please refer to the three.js examples to see how to do this: https://threejs.org/examples/?q=raycast

    // Attach click event listener to the document
    // document.addEventListener('click', onClick, false);

    viewer.renderer.domElement.addEventListener("click", onClick, false);

    return () => {
      // Cleanup
      // viewer.removeEventListener("click", handleClick);
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
