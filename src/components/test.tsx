// @ts-ignore
// @ts-nocheck

export function Test() {
  return (
    <div className="w-screen h-screen">
      <TestPotree
        // pointCloudUrl="https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.json"
        pointCloudUrl="https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.js"
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
// import { Button } from "./ui/button";
import { Camera, MapPinIcon, ZoomIn, ZoomOut } from "lucide-react";
// import 'potree/build/potree.css';

import { Drawer, List, ListItem } from "@material-ui/core";

import { Button } from "@/components/ui/button";

function CustomSidebar({ viewer }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleMeasurement = () => {
    // Implement your measurement tool logic here
  };

  const handleAddRectangle = () => {
    // Example position, width, height, and description
    const position = new THREE.Vector3(0, 0, 0);
    const width = 10;
    const height = 5;
    const description = "This is a rectangle";
    // addRectangle(viewer, position, width, height, description);
  };

  return (
    <div className="bg-red-300 z-20">
      <Button onClick={toggleDrawer(true)}>Open Sidebar</Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={handleMeasurement}>
              Measurement Tool
            </ListItem>
            <ListItem button onClick={handleAddRectangle}>
              Add Rectangle
            </ListItem>
            {/* Add more list items for other tools */}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

type PointcloudNavigatorProps = {
  pointCloudUrl: string;
};

const Potree = window.Potree;

export default function TestPotree({
  pointCloudUrl,
}: PointcloudNavigatorProps) {
  const potreeContainerDiv = useRef(null);
  const viewerRef = useRef(null);

  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationPosition, setAnnotationPosition] = useState(null);
  const [annotationTitle, setAnnotationTitle] = useState("");
  const [annotationDescription, setAnnotationDescription] = useState("");

  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  useEffect(() => {
    const viewerElem = potreeContainerDiv.current;
    const viewer = new Potree.Viewer(viewerElem);
    console.log("viewer: ", window.Potree);
    viewerRef.current = viewer; // Save viewer to ref for later use

    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    viewer.loadSettingsFromURL();
    viewer.setBackground("black");

    Potree.loadPointCloud(pointCloudUrl).then(
      (e) => {
        const pointcloud = e.pointcloud;
        const material = pointcloud.material;

        material.activeAttributeName = "rgba";
        material.minSize = 2;
        material.pointSizeType = Potree.PointSizeType.FIXED;

        console.log("pointcloud: ", pointcloud);
        console.log("material: ", material);

        viewer.scene.addPointCloud(pointcloud);
        viewer.fitToScreen();

        // const materials = new THREE.LineBasicMaterial({ color: 0x0000ff });
        // const points = [];
        // points.push(new THREE.Vector3(-10, 0, 0));
        // points.push(new THREE.Vector3(0, 10, 0));
        // points.push(new THREE.Vector3(10, 0, 0));

        // const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // const line = new THREE.Line(geometry, material);

        // viewer.scene.add(line);

        const modelPosition = new THREE.Vector3(
          -0.748212993144989,
          -2.78040599822998,
          2.54782128334045
        );

        const path = [0, 0, 0, 1, 1, 1, 2, 2, 2];

        // Adjust path coordinates based on model position
        for (let i = 0; i < path.length; i += 3) {
          path[i] += modelPosition.x;
          path[i + 1] += modelPosition.y;
          path[i + 2] += modelPosition.z;
        }

        const geometrywww = new THREE.BufferGeometry();
        const materialwww = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const buffer = new Float32Array(path);
        geometrywww.setAttribute(
          "position",
          new THREE.BufferAttribute(buffer, 3)
        );
        geometrywww.computeBoundingSphere();

        const line = new THREE.Line(geometrywww, materialwww);
        viewer.scene.scene.add(line);

        // const geometrycc = new THREE.BoxGeometry(1, 1, 1);
        // const materialcc = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // const mesh = new THREE.Mesh(geometrycc, materialcc);
        // viewer.scene.add(mesh);
        // const path = [
        //     590058.52, 231354.16, 766.42,
        //     589941.68, 231476.67, 736.52,
        //     589781.32, 231491.91, 757.73,
        //     589711.88, 231445.56, 768.16,
        //     589702.04, 231336.49, 772.91
        // ];

        // const geometrywww = new THREE.BufferGeometry();
        // const materialwww = new THREE.LineBasicMaterial({ color: 0xff0000 });
        // const buffer = new Float32Array(path);
        // geometrywww.addAttribute('position', new THREE.BufferAttribute(buffer, 3));
        // geometrywww.computeBoundingSphere();

        // const line = new THREE.Line(geometrywww, materialwww);
        // viewer.scene.scene.add(line);

        console.log("This is the url", pointCloudUrl);
      },
      (e) => console.err("ERROR: ", e)
    );

    return () => {
      if (viewer && typeof viewer.dispose === "function") {
        viewer.dispose();
      }
    };
  }, [pointCloudUrl]);

  function zoomIn() {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.controls.radiusDelta = -3; // Adjust this value as needed
    }
  }

  function zoomOut() {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.controls.radiusDelta = 3; // Adjust this value as needed
    }
  }

  function addLines() {
    const viewer = viewerRef.current;

    const modelPosition = new THREE.Vector3(
      -0.748212993144989,
      -2.78040599822998,
      2.54782128334045
    );

    const path = [2, 2, 2, 1, 1, 1, 0, 0, 0];

    // Adjust path coordinates based on model position
    for (let i = 0; i < path.length; i += 3) {
      path[i] += modelPosition.x;
      path[i + 1] += modelPosition.y;
      path[i + 2] += modelPosition.z;
    }

    const geometrywww = new THREE.BufferGeometry();
    const materialwww = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const buffer = new Float32Array(path);
    geometrywww.setAttribute("position", new THREE.BufferAttribute(buffer, 3));
    geometrywww.computeBoundingSphere();

    const line = new THREE.Line(geometrywww, materialwww);

    viewer.scene.scene.add(line);
  }

  const addLine = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      const measure = new Potree.Measure();
      measure.showDistances = true;
      viewer.scene.addMeasurement(measure);
    }
  };

  const addRectangle = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      const measure = new Potree.Measure();
      measure.showArea = true;
      viewer.scene.addMeasurement(measure);
    }
  };

  // const handleAddAnnotation = () => {
  //   const viewer = viewerRef.current;
  //   if (viewer) {
  //     const dummyMeasure = viewer.measuringTool.startInsertion({
  //       showDistances: false,
  //       showAngles: false,
  //       showCoordinates: true,
  //       showArea: false,
  //       closed: true,
  //       maxMarkers: 1,
  //       name: "Point",
  //     });

  //     const stopDragging = (e) => {
  //       if (e.key === "Escape") {
  //         viewer.inputHandler.drag = null;
  //         dummyMeasure.removeMarker(dummyMeasure.points.length - 1);
  //         viewer.scene.removeMeasurement(dummyMeasure);
  //         document.removeEventListener("keyup", stopDragging);
  //       }
  //     };

  //     document.addEventListener("keyup", stopDragging);

  //     dummyMeasure.addEventListener("marker_dropped", (markerDroppedEvent) => {
  //       document.removeEventListener("keyup", stopDragging);

  //       const position = markerDroppedEvent.measurement.points[0].position;
  //       setAnnotationPosition(position);
  //       setShowAnnotationForm(true);
  //     });
  //   }
  // };

  // const handleFormSubmit = () => {
  //   const viewer = viewerRef.current;
  //   if (viewer && annotationPosition && annotationTitle) {
  //     viewer.scene.addAnnotation(annotationPosition, {
  //       title: annotationTitle,
  //       description: annotationDescription,
  //       cameraPosition: [
  //         viewer.scene.view.position.x,
  //         viewer.scene.view.position.y,
  //         viewer.scene.view.position.z,
  //       ],
  //       cameraTarget: [
  //         viewer.scene.view.getPivot().x,
  //         viewer.scene.view.getPivot().y,
  //         viewer.scene.view.getPivot().z,
  //       ],
  //     });

  //     setShowAnnotationForm(false);
  //     setAnnotationTitle("");
  //     setAnnotationDescription("");
  //   }
  // };

  const handleAddAnnotation = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      const dummyMeasure = viewer.measuringTool.startInsertion({
        showDistances: false,
        showAngles: false,
        showCoordinates: false,
        showArea: false,
        closed: true,
        maxMarkers: 1,
        name: "Point",
      });

      const stopDragging = (e) => {
        if (e.key === "Escape") {
          viewer.inputHandler.drag = null;
          dummyMeasure.removeMarker(dummyMeasure.points.length - 1);
          viewer.scene.removeMeasurement(dummyMeasure);
          document.removeEventListener("keyup", stopDragging);
        }
      };

      document.addEventListener("keyup", stopDragging);

      dummyMeasure.addEventListener("marker_dropped", (markerDroppedEvent) => {
        document.removeEventListener("keyup", stopDragging);

        const position = markerDroppedEvent.measurement.points[0].position;
        setAnnotationPosition(position);
        setShowAnnotationForm(true);
      });
    }
  };

  const handleFormSubmit = () => {
    const viewer = viewerRef.current;
    if (viewer && annotationPosition && annotationTitle) {
      const annotation = viewer.scene.addAnnotation(annotationPosition, {
        title: annotationTitle,
        description: annotationDescription,
        cameraPosition: [
          viewer.scene.view.position.x,
          viewer.scene.view.position.y,
          viewer.scene.view.position.z,
        ],
        cameraTarget: [
          viewer.scene.view.getPivot().x,
          viewer.scene.view.getPivot().y,
          viewer.scene.view.getPivot().z,
        ],
      });

      // Customizing the annotation icon
      const customIcon = document.createElement("div");
      customIcon.innerHTML = '<img src="/favicon.ico" alt="Annotation Icon" />';
      customIcon.style.cursor = "pointer";

      customIcon.addEventListener("click", () => {
        setSelectedAnnotation(annotation);
        setAnnotationTitle(annotation.title);
        setAnnotationDescription(annotation.description);
      });

      // Clear the default content and append the custom icon
      // annotation.domElement.innerHTML = "";
      // console.log("annotation dom element: ", annotation.domElement);
      // annotation.domElement.appendChild(customIcon);

      setAnnotations([...annotations, annotation]);
      setShowAnnotationForm(false);
      setAnnotationTitle("");
      setAnnotationDescription("");
    }
  };

  const handleAnnotationUpdate = () => {
    if (selectedAnnotation && annotationTitle) {
      selectedAnnotation.title = annotationTitle;
      selectedAnnotation.description = annotationDescription;

      setSelectedAnnotation(null);
      setAnnotationTitle("");
      setAnnotationDescription("");
    }
  };

  return (
    <>
      <div id="potree-root" className="w-full h-full">
        <div className="potree_container bg-black flex h-full flex-col relative">
          <CustomSidebar viewer={viewerRef.current} />
          <div id="potree_render_area" ref={potreeContainerDiv}></div>
          <div className="absolute rounded flex gap-x-1  bottom-4 left-4 z-20 ">
            <div className="bg-blue-400/40 text-white p-2 rounded-xl">
              <span>3D</span>
            </div>
          </div>
          <div className="absolute bg-primary rounded flex gap-x-1  bottom-4 right-4 z-20 ">
            {/* <Button
              title="Capture Screenshot"
              onClick={captureScreenshot}
              size="icon"
            >
              <Camera className="w-[22px] h-[22px]" />
            </Button> */}
            <Button
              title="Add Annotation"
              onClick={handleAddAnnotation}
              size="icon"
            >
              <MapPinIcon className="w-5 h-5" />
            </Button>
            <Button title="Add Line" onClick={addLine}>
              Add Line
            </Button>
            <Button title="Add Rectangle" onClick={addRectangle}>
              Add Rectangle
            </Button>
            <Button title="Add Lines" onClick={addLines} size="icon">
              <Camera className="w-5 h-5" />
            </Button>
            <Button title="Zoom In" onClick={zoomIn} size="icon">
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button title="Zoom Out" onClick={zoomOut} size="icon">
              <ZoomOut className="w-5 h-5" />
            </Button>
          </div>
          {showAnnotationForm ? (
            <>
              <Card
                annotationTitle={annotationTitle}
                annotationDescription={annotationDescription}
                handleFormSubmit={handleFormSubmit}
                setAnnotationDescription={setAnnotationDescription}
                setAnnotationTitle={setAnnotationTitle}
              />
              {/* <div className="annotation-form absolute top-0 left-0 z-30 p-4 bg-white shadow-lg">
              <h3>Add Annotation</h3>
              <input
                type="text"
                placeholder="Title"
                value={annotationTitle}
                onChange={(e) => setAnnotationTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={annotationDescription}
                onChange={(e) => setAnnotationDescription(e.target.value)}
              />
              <Button onClick={handleFormSubmit}>Submit</Button>
            </div> */}
              {/* <Card
                annotationTitle={annotationTitle}
                annotationDescription={annotationDescription}
                handleFormSubmit={handleFormSubmit}
                setAnnotationDescription={setAnnotationDescription}
                setAnnotationTitle={setAnnotationTitle}
              /> */}
              {/* <div className="annotation-form absolute top-0 left-0 z-30 p-4 bg-white shadow-lg">
              <h3>Add Annotation</h3>
              <input
                type="text"
                placeholder="Title"
                value={annotationTitle}
                onChange={(e) => setAnnotationTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={annotationDescription}
                onChange={(e) => setAnnotationDescription(e.target.value)}
              />
              <Button onClick={handleFormSubmit}>Submit</Button>
            </div> */}
            </>
          ) : null}
          {selectedAnnotation && (
            <div className="annotation-card absolute top-0 left-0 z-30 p-4 bg-white shadow-lg">
              <h3>Edit Annotation</h3>
              <input
                type="text"
                placeholder="Title"
                value={annotationTitle}
                onChange={(e) => setAnnotationTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={annotationDescription}
                onChange={(e) => setAnnotationDescription(e.target.value)}
              />
              <Button onClick={handleAnnotationUpdate}>Update</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Card({
  annotationTitle,
  setAnnotationTitle,
  annotationDescription,
  setAnnotationDescription,
  handleFormSubmit,
}) {
  return (
    <div className="fixed inset-0 overflow-y-auto z-20">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="text-lg font-medium leading-6 text-white">
            Add Annotation
          </h3>
          <div className="mt-6 flex flex-col items-center gap-y-6">
            <input
              type="text"
              placeholder="Title"
              value={annotationTitle}
              onChange={(e) => setAnnotationTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
            />
            <textarea
              placeholder="Description"
              value={annotationDescription}
              onChange={(e) => setAnnotationDescription(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
            />
            <div className="flex justify-end w-full">
              <Button
                //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                variant="outline"
                onClick={handleFormSubmit}
                className="space-x-1.5 active:bg-zinc-400"
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
    </div>
  );
}
