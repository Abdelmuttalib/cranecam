import useSWR from "swr";
import { apiPaths, getPotreeDate } from "./lib/api";
import DataView from "./components/data-viewer";

// #242424
// #131f22

function App() {
  const { data } = useSWR(apiPaths.getPotreeDate, getPotreeDate);

  console.log(data);

  return (
    <div className="w-full min-h-screen">
      {data && <DataView data={data} />}
      {/* <Xeokit /> */}
      {/* <Test /> */}
    </div>
  );
}

export default App;



// import { Viewer, LASLoaderPlugin } from "@xeokit/xeokit-sdk"


// function Xeokit() {
//   console.log('Xeokit-sdk');



//   React.useEffect(() => {

//     function initializeViewer() {
//       const viewer = new Viewer({
//         canvasId: "viewercanvas",
//         transparent: true
//       });


//       viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
//       viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
//       viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

//       viewer.scene.camera.project.far = 10000000;

//       // viewer.scene.camera.project.


//       // configure points material
//       viewer.scene.pointsMaterial.pointSize = 2;
//       viewer.scene.pointsMaterial.roundPoints = false;
//       viewer.scene.pointsMaterial.perspectivePoints = true;
//       viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
//       viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
//       viewer.scene.pointsMaterial.filterIntensity = true;
//       viewer.scene.pointsMaterial.minIntensity = 0;
//       viewer.scene.pointsMaterial.maxIntensity = 1;

//       //   new FastNavPlugin(viewer, {
//       //     scaleCanvasResolution: true,      // Reduce canvas resolution while moving (default is false)
//       //     scaleCanvasResolutionFactor: 0.5,
//       // });


//       //----------------------------------------------------------------------------------------------------------------------
//       // Install a LASLoaderPlugin, load a model, fit to view
//       //----------------------------------------------------------------------------------------------------------------------

//       const lasLoader = new LASLoaderPlugin(viewer, {
//         skip: 10, // Load every 10th point
//         fp64: false, // Positions expected in 32-bit floats instead of 64-bit
//         colorDepth: "auto" // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
//       });

//       const t0 = performance.now();

//       // document.getElementById("time").innerHTML = "Loading model...";

//       const modelPath = './autzen.laz';

//       const sceneModel = lasLoader.load({
//         id: "myModel",
//         src: modelPath,
//         rotation: [-90, 0, 0]
//       });

//       sceneModel.on("loaded", () => {
//         const t1 = performance.now();
//         // document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
//       });


//       //------------------------------------------------------------------------------------------------------------------
//       // GUI to play with points material properties
//       //------------------------------------------------------------------------------------------------------------------

//       const pointsMaterial = viewer.scene.pointsMaterial;
//       const camera = viewer.camera;

//       // const guiParams = new function () {
//       //   this.roundPoints = pointsMaterial.roundPoints;
//       //   this.pointSize = pointsMaterial.pointSize;
//       //   this.perspectivePoints = pointsMaterial.perspectivePoints;
//       //   this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
//       //   this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
//       //   this.filterIntensity = pointsMaterial.filterIntensity;
//       //   this.minIntensity = pointsMaterial.minIntensity;
//       //   this.maxIntensity = pointsMaterial.maxIntensity;
//       //   this.perspective = (camera.projection === "perspective");
//       // }();

//       // const update = function () {
//       //   pointsMaterial.roundPoints = guiParams.roundPoints;
//       //   pointsMaterial.pointSize = guiParams.pointSize;
//       //   pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
//       //   pointsMaterial.minPerspectivePointSize = guiParams.minPerspectivePointSize;
//       //   pointsMaterial.maxPerspectivePointSize = guiParams.maxPerspectivePointSize;
//       //   pointsMaterial.filterIntensity = guiParams.filterIntensity;
//       //   pointsMaterial.minIntensity = guiParams.minIntensity;
//       //   pointsMaterial.maxIntensity = guiParams.maxIntensity;
//       //   camera.projection = guiParams.perspective ? "perspective" : "ortho";
//       //   requestAnimationFrame(update);
//       // };

//       // update();

//       // const gui = new dat.GUI({ autoPlace: false, width: "100%" });

//       // const pointsMaterialFolder = gui.addFolder('PointsMaterial');
//       // pointsMaterialFolder.add(guiParams, 'roundPoints');
//       // pointsMaterialFolder.add(guiParams, 'pointSize', 1, 50);
//       // pointsMaterialFolder.add(guiParams, 'perspectivePoints');
//       // pointsMaterialFolder.add(guiParams, 'minPerspectivePointSize', 1, 50);
//       // pointsMaterialFolder.add(guiParams, 'maxPerspectivePointSize', 1, 50);
//       // pointsMaterialFolder.add(guiParams, 'filterIntensity');
//       // pointsMaterialFolder.add(guiParams, 'minIntensity', 0.0, 1.0);
//       // pointsMaterialFolder.add(guiParams, 'maxIntensity', 0.0, 1.0);
//       // pointsMaterialFolder.open();

//       // const cameraFolder = gui.addFolder('Camera');
//       // cameraFolder.add(guiParams, 'perspective');
//       // cameraFolder.open();

//       // const customContainer = document.getElementById('myDatGuiContainer');
//       // customContainer.appendChild(gui.domElement);

//     };



//     initializeViewer();

//   }, []);

//   return (
//     <>
//       {/* <Viewer /> */}
//       <div>
//         <canvas id="viewercanvas"></canvas>
//       </div>
//     </>
//   )
// };