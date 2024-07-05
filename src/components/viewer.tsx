import PointcloudNavigator from "./potree-viewer";
import { useRenderView } from "@/hooks/use-render-view";

export function Viewer() {
  const { selectedDate, compareMode } = useRenderView();

  return (
    <div className="w-full h-main flex-grow relative">
      {/* <IFCViewer /> */}
      {/* <THREE ifcURL="./Project1.ifc" /> */}
      {/* <XeokitViewer /> */}
      {/* <XeokitIFCViewer /> */}
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


// las example xeokit-sdk
// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>xeokit Example</title>
//     <link href="../css/pageStyle.css" rel="stylesheet"/>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
//     <script src="../libs/dat.gui.min.js" type="text/javascript"></script>
//     <link href="../css/dat-gui-light-style.css" rel="stylesheet"/>
//     <style>
//         .xeokit-camera-pivot-marker {
//             color: #ffffff;
//             position: absolute;
//             width: 25px;
//             height: 25px;
//             border-radius: 15px;
//             border: 2px solid #ebebeb;
//             background: black;
//             visibility: hidden;
//             box-shadow: 5px 5px 15px 1px #000000;
//             z-index: 10000;
//             pointer-events: none;
//         }
//     </style>
// </head>

// <body>
// <input type="checkbox" id="info-button"/>
// <label for="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
// <canvas id="myCanvas"></canvas>
// <div className="slideout-sidebar">
//     <img className="info-icon" src="../../assets/images/laserScan.png"/>
//     <h1>LASLoaderPlugin</h1>
//     <h2>Loading a lidar point cloud with 31M colored points from LAS format</h2>
//     <h3>Stats</h3>
//     <ul>
//         <li>
//             <div id="time">Loading JavaScript modules...</div>
//         </li>
//     </ul>
//     <h3>Customize points</h3>
//     <div id="myDatGuiContainer"></div>
//     <h3>Components used</h3>
//     <ul>
//         <li>
//             <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
//                target="_other">Viewer</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/LASLoaderPlugin/LASLoaderPlugin.js~LASLoaderPlugin.html"
//                target="_other">LASLoaderPlugin</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/viewer/scene/materials/PointsMaterial.js~PointsMaterial.html"
//                target="_other">PointsMaterial</a>
//         </li>
//     </ul>
//     <h3>Resources</h3>
//     <ul>
//         <li><a href="https://loaders.gl/" target="_other">Model source</a></li>
//     </ul>

// </div>
// </body>
// <script type="module">

//     //------------------------------------------------------------------------------------------------------------------
//     // Import the modules we need for this example
//     //------------------------------------------------------------------------------------------------------------------

//     import {Viewer, LASLoaderPlugin, FastNavPlugin} from "../../dist/xeokit-sdk.min.es.js";

//     const viewer = new Viewer({
//         canvasId: "myCanvas",
//         transparent: true
//     });

//     viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
//     viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
//     viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

//     viewer.scene.camera.project.far = 10000000;

//     const pivotElement = document.createRange().createContextualFragment("<div className='xeokit-camera-pivot-marker'></div>").firstChild;
//     document.body.appendChild(pivotElement);
//     viewer.cameraControl.pivotElement = pivotElement;

//     //------------------------------------------------------------------------------------------------------------------
//     // Configure points material
//     //------------------------------------------------------------------------------------------------------------------

//     viewer.scene.pointsMaterial.pointSize = 2;
//     viewer.scene.pointsMaterial.roundPoints = false;
//     viewer.scene.pointsMaterial.perspectivePoints = true;
//     viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
//     viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
//     viewer.scene.pointsMaterial.filterIntensity = true;
//     viewer.scene.pointsMaterial.minIntensity = 0;
//     viewer.scene.pointsMaterial.maxIntensity = 1;

//     new FastNavPlugin(viewer, {
//         scaleCanvasResolution: true,      // Reduce canvas resolution while moving (default is false)
//         scaleCanvasResolutionFactor: 0.5,
//     });

//     //----------------------------------------------------------------------------------------------------------------------
//     // Install a LASLoaderPlugin, load a model, fit to view
//     //----------------------------------------------------------------------------------------------------------------------

//     const lasLoader = new LASLoaderPlugin(viewer, {
//         skip: 10, // Load every 10th point
//         fp64: false, // Positions expected in 32-bit floats instead of 64-bit
//         colorDepth: "auto" // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
//     });

//     const t0 = performance.now();

//     document.getElementById("time").innerHTML = "Loading model...";

//     const sceneModel = lasLoader.load({
//         id: "myModel",
//         src: "../../assets/models/las/autzen.laz",
//         rotation: [-90, 0, 0]
//     });

//     sceneModel.on("loaded", () => {
//         const t1 = performance.now();
//         document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
//     });

//     //------------------------------------------------------------------------------------------------------------------
//     // GUI to play with points material properties
//     //------------------------------------------------------------------------------------------------------------------

//     const pointsMaterial = viewer.scene.pointsMaterial;
//     const camera = viewer.camera;

//     const guiParams = new function () {
//         this.roundPoints = pointsMaterial.roundPoints;
//         this.pointSize = pointsMaterial.pointSize;
//         this.perspectivePoints = pointsMaterial.perspectivePoints;
//         this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
//         this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
//         this.filterIntensity = pointsMaterial.filterIntensity;
//         this.minIntensity = pointsMaterial.minIntensity;
//         this.maxIntensity = pointsMaterial.maxIntensity;
//         this.perspective = (camera.projection === "perspective");
//     }();

//     const update = function () {
//         pointsMaterial.roundPoints = guiParams.roundPoints;
//         pointsMaterial.pointSize = guiParams.pointSize;
//         pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
//         pointsMaterial.minPerspectivePointSize = guiParams.minPerspectivePointSize;
//         pointsMaterial.maxPerspectivePointSize = guiParams.maxPerspectivePointSize;
//         pointsMaterial.filterIntensity = guiParams.filterIntensity;
//         pointsMaterial.minIntensity = guiParams.minIntensity;
//         pointsMaterial.maxIntensity = guiParams.maxIntensity;
//         camera.projection = guiParams.perspective ? "perspective" : "ortho";
//         requestAnimationFrame(update);
//     };

//     update();

//     const gui = new dat.GUI({autoPlace: false, width: "100%"});

//     const pointsMaterialFolder = gui.addFolder('PointsMaterial');
//     pointsMaterialFolder.add(guiParams, 'roundPoints');
//     pointsMaterialFolder.add(guiParams, 'pointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'perspectivePoints');
//     pointsMaterialFolder.add(guiParams, 'minPerspectivePointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'maxPerspectivePointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'filterIntensity');
//     pointsMaterialFolder.add(guiParams, 'minIntensity', 0.0, 1.0);
//     pointsMaterialFolder.add(guiParams, 'maxIntensity', 0.0, 1.0);
//     pointsMaterialFolder.open();

//     const cameraFolder = gui.addFolder('Camera');
//     cameraFolder.add(guiParams, 'perspective');
//     cameraFolder.open();

//     const customContainer = document.getElementById('myDatGuiContainer');
//     customContainer.appendChild(gui.domElement);


// </script>
// </html>

import { Viewer as XEOViewer, LASLoaderPlugin, FastNavPlugin } from '@xeokit/xeokit-sdk';

export function XeokitViewer() {

  React.useEffect(() => {

    console.log("document", document)

    const viewer = new XEOViewer({
      canvasId: "myCanvas",
      transparent: true
    });

    // viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
    // viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
    // viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

    // viewer.scene.camera.project.far = 10000000;

    const pivotElement = document.createRange().createContextualFragment("<div className='xeokit-camera-pivot-marker'></div>").firstChild;

    document.body.appendChild(pivotElement);

    viewer.cameraControl.pivotElement = pivotElement;

    //------------------------------------------------------------------------------------------------------------------
    // Configure points material
    //------------------------------------------------------------------------------------------------------------------

    viewer.scene.pointsMaterial.pointSize = 2;
    viewer.scene.pointsMaterial.roundPoints = false;
    viewer.scene.pointsMaterial.perspectivePoints = true;
    viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
    viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
    viewer.scene.pointsMaterial.filterIntensity = true;
    viewer.scene.pointsMaterial.minIntensity = 0;
    viewer.scene.pointsMaterial.maxIntensity = 1;


    // new FastNavPlugin(viewer, {
    //   scaleCanvasResolution: true,      // Reduce canvas resolution while moving (default is false)
    //   scaleCanvasResolutionFactor: 0.5,
    // });

    //----------------------------------------------------------------------------------------------------------------------
    // Install a LASLoaderPlugin, load a model, fit to view
    //----------------------------------------------------------------------------------------------------------------------

    const lasLoader = new LASLoaderPlugin(viewer, {
      // skip: 10, // Load every 10th point
      fp64: false, // Positions expected in 32-bit floats instead of 64-bit
      colorDepth: "auto" // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
    });

    const t0 = performance.now();

    document.getElementById("time").innerHTML = "Loading model...";

    const sceneModel = lasLoader.load({
      id: "myModel",
      // src: "./indoor.laz",
      src: "Nalls_Pumpkin_Hill.laz",
      // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
      rotation: [-90, 0, 0]
    });

    sceneModel.on("loaded", () => {
      const t1 = performance.now();
      document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
    });

    //------------------------------------------------------------------------------------------------------------------
    // GUI to play with points material properties
    //------------------------------------------------------------------------------------------------------------------

    const pointsMaterial = viewer.scene.pointsMaterial;
    const camera = viewer.camera;

    const guiParams = new function () {
      this.roundPoints = pointsMaterial.roundPoints;
      this.pointSize = pointsMaterial.pointSize;
      this.perspectivePoints = pointsMaterial.perspectivePoints;
      this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
      this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
      this.filterIntensity = pointsMaterial.filterIntensity;
      this.minIntensity = pointsMaterial.minIntensity;
      this.maxIntensity = pointsMaterial.maxIntensity;
      this.perspective = (camera.projection === "perspective");
    }();

    const update = function () {
      pointsMaterial.roundPoints = guiParams.roundPoints;
      pointsMaterial.pointSize = guiParams.pointSize;
      pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
      pointsMaterial.minPerspectivePointSize = guiParams.minPerspectivePointSize;
      pointsMaterial.maxPerspectivePointSize = guiParams.maxPerspectivePointSize;
      pointsMaterial.filterIntensity = guiParams.filterIntensity;
      pointsMaterial.minIntensity = guiParams.minIntensity;
      pointsMaterial.maxIntensity = guiParams.maxIntensity;
      camera.projection = guiParams.perspective ? "perspective" : "ortho";
      requestAnimationFrame(update);
    };

    update();

    const gui = new dat.GUI({ autoPlace: false, width: "100%" });

    const pointsMaterialFolder = gui.addFolder('PointsMaterial');
    pointsMaterialFolder.add(guiParams, 'roundPoints');
    pointsMaterialFolder.add(guiParams, 'pointSize', 1, 50);
    pointsMaterialFolder.add(guiParams, 'perspectivePoints');
    pointsMaterialFolder.add(guiParams, 'minPerspectivePointSize', 1, 50);
    pointsMaterialFolder.add(guiParams, 'maxPerspectivePointSize', 1, 50);
    pointsMaterialFolder.add(guiParams, 'filterIntensity');
    pointsMaterialFolder.add(guiParams, 'minIntensity', 0.0, 1.0);
    pointsMaterialFolder.add(guiParams, 'maxIntensity', 0.0, 1.0);
    pointsMaterialFolder.open();

    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(guiParams, 'perspective');
    cameraFolder.open();

    const customContainer = document.getElementById('myDatGuiContainer');
    customContainer.appendChild(gui.domElement);


    console.log("viewer", viewer)


  }, [])

  return (
    <>
      <div className="w-full h-full">
        {/* <input type="checkbox" id="info-button" /> */}
        <label htmlFor="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
        <canvas id="myCanvas" className="w-full h-full"></canvas>
        <div className="slideout-sidebar hidden">
          <img className="info-icon" src="../../assets/images/laserScan.png" />
          <h1>LASLoaderPlugin</h1>
          <h2>Loading a lidar point cloud with 31M colored points from LAS format</h2>
          <h3>Stats</h3>
          <ul>
            <li>
              <div id="time">Loading JavaScript modules...</div>
            </li>
          </ul>
          <h3>Customize points</h3>
          <div id="myDatGuiContainer"></div>
          <h3>Components used</h3>
          <ul>
            <li>
              <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
                target="_other">Viewer</a>
            </li>
            <li>
              <a href="../../docs/className/src/plugins/LASLoaderPlugin/LASLoaderPlugin.js~LASLoaderPlugin.html"
                target="_other">LASLoaderPlugin</a>
            </li>
            <li>
              <a href="../../docs/className/src/viewer/scene/materials/PointsMaterial.js~PointsMaterial.html"
                target="_other">PointsMaterial</a>
            </li>
          </ul>
          <h3>Resources</h3>
          <ul>
            <li><a href="https://loaders.gl/" target="_other">Model source</a></li>
          </ul>
        </div>
      </div>
    </>
  )
};

// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>xeokit Example</title>
//     <link href="../css/pageStyle.css" rel="stylesheet"/>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
//     <style>

//         /* ----------------------------------------------------------------------------------------------------------*/
//         /* NavCubePlugin */
//         /* ----------------------------------------------------------------------------------------------------------*/

//         #myNavCubeCanvas {
//             position: absolute;
//             width: 250px;
//             height: 250px;
//             bottom: 50px;
//             right: 10px;
//             z-index: 200000;
//         }

//         /* ----------------------------------------------------------------------------------------------------------*/
//         /* TreeViewPlugin */
//         /* ----------------------------------------------------------------------------------------------------------*/

//         #treeViewContainer {
//             pointer-events: all;
//             height: 100%;
//             overflow-y: scroll;
//             overflow-x: hidden;
//             position: absolute;
//             background-color: rgba(255, 255, 255, 0.2);
//             color: black;
//             top: 80px;
//             z-index: 200000;
//             float: left;
//             left: 0;
//             padding-left: 10px;
//             font-family: 'Roboto', sans-serif;
//             font-size: 15px;
//             user-select: none;
//             -ms-user-select: none;
//             -moz-user-select: none;
//             -webkit-user-select: none;
//             width: 350px;
//         }

//         #treeViewContainer ul {
//             list-style: none;
//             padding-left: 1.75em;
//             pointer-events: none;
//         }

//         #treeViewContainer ul li {
//             position: relative;
//             width: 500px;
//             pointer-events: none;
//             padding-top: 3px;
//             padding-bottom: 3px;
//             vertical-align: middle;
//         }

//         #treeViewContainer ul li a {
//             background-color: #eee;
//             border-radius: 50%;
//             color: #000;
//             display: inline-block;
//             height: 1.5em;
//             left: -1.5em;
//             position: absolute;
//             text-align: center;
//             text-decoration: none;
//             width: 1.5em;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a.plus {
//             background-color: #ded;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a.minus {
//             background-color: #eee;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a:active {
//             top: 1px;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li span:hover {
//             color: white;
//             cursor: pointer;
//             background: black;
//             padding-left: 2px;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li span {
//             display: inline-block;
//             width: calc(100% - 50px);
//             padding-left: 2px;
//             pointer-events: all;
//             height: 23px;
//         }

//         #treeViewContainer .highlighted-node { /* Appearance of node highlighted with TreeViewPlugin#showNode() */
//             border: black solid 1px;
//             background: yellow;
//             color: black;
//             padding-left: 1px;
//             padding-right: 5px;
//             pointer-events: all;
//         }

//     </style>
// </head>
// <body>
// <input type="checkbox" id="info-button"/>
// <label for="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
// <canvas id="myCanvas"></canvas>
// <canvas id="myNavCubeCanvas"></canvas>
// <div className="slideout-sidebar">
//     <img className="info-icon" src="../../assets/images/bim_icon.png"/>
//     <h1>WebIFCLoaderPlugin</h1>
//     <h2>Loading an IFC File</h2>
//     <p><a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
//           target="_other">WebIFCLoaderPlugin</a> is the easiest way to load IFC models into a xeokit Viewer.</p>
//     <p>WebIFCLoaderPlugin loads IFC STEP files and parses them within the browser using <a
//             href="https://github.com/tomvandig/web-ifc"
//             target="_other">web-ifc</a>, to create 3D objects within the
//         Viewer.</p>

//     <h3>Limitations</h3>
//     <p>Loading and parsing huge IFC STEP files can be slow, and can overwhelm the browser, however. To view your
//         largest IFC models, we recommend instead pre-converting those to xeokit's compressed native .XKT format, then
//         loading them with <a href="../../docs/className/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js~XKTLoaderPlugin.html"
//                              target="_other">XKTLoaderPlugin</a>.</p>
//     <h3>Stats</h3>
//     <ul>
//         <li>
//             <div id="time">Loading JavaScript modules...</div>
//         </li>
//     </ul>
//     <h3>Components used</h3>
//     <ul>
//         <li>
//             <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
//                target="_other">Viewer</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
//                target="_other">WebIFCLoaderPlugin</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/NavCubePlugin/NavCubePlugin.js~NavCubePlugin.html"
//                target="_other">NavCubePlugin</a>
//         </li>
//     </ul>
//     <h3>Assets</h3>
//     <ul>
//         <li>
//             <a href="http://openifcmodel.cs.auckland.ac.nz/Model/Details/274"
//                target="_other">Model source</a>
//         </li>
//     </ul>
// </div>
// </body>

// <script type="module">

//     import {Viewer, WebIFCLoaderPlugin, NavCubePlugin} from "../../dist/xeokit-sdk.min.es.js";
//     import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/web-ifc-api.js";

//     const viewer = new Viewer({
//         canvasId: "myCanvas",
//         transparent: true
//     });

//     viewer.camera.eye = [102.07185264355974, 45.23873322531372, -54.1001537318987]
//     viewer.camera.look = [35.0291287591034, -3.5295781673428905, -20.312957533628705]
//     viewer.camera.up = [-0.48646319926706455, 0.8385999559445908, 0.24516049773277654]

//     new NavCubePlugin(viewer, {
//         canvasId: "myNavCubeCanvas",
//         visible: true,
//         size: 250,
//         alignment: "bottomRight",
//         bottomMargin: 100,
//         rightMargin: 10
//     });

//     const IfcAPI = new WebIFC.IfcAPI();

//     IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/");

//     IfcAPI.Init().then(() => {

//         const ifcLoader = new WebIFCLoaderPlugin(viewer, {
//             WebIFC,
//             IfcAPI
//         });

//         const sceneModel = ifcLoader.load({
//             id: "myModel",
//             src: "../../assets/models/ifc/rac_advanced_sample_project.ifc",
//             loadMetadata: false, // <<------- Don't load IFC metadata
//             edges: true
//         });

//         sceneModel.on("loaded", () => {
//             viewer.cameraFlight.jumpTo(sceneModel);
//         });

//         const t0 = performance.now();
//         document.getElementById("time").innerHTML = "Loading model...";
//         sceneModel.on("loaded", function () {
//             const t1 = performance.now();
//             document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
//         });
//     });

// </script>
// </html>

import { WebIFCLoaderPlugin, NavCubePlugin } from '@xeokit/xeokit-sdk';

import * as WebIFC from "web-ifc";

export function XeokitIFCViewer() {


  React.useEffect(() => {

    const viewer = new XEOViewer({
      canvasId: "myCanvas",
      transparent: true
    });

    viewer.camera.eye = [102.07185264355974, 45.23873322531372, -54.1001537318987]
    viewer.camera.look = [35.0291287591034, -3.5295781673428905, -20.312957533628705]
    viewer.camera.up = [-0.48646319926706455, 0.8385999559445908, 0.24516049773277654]

    new NavCubePlugin(viewer, {
      canvasId: "myNavCubeCanvas",
      visible: true,
      size: 250,
      alignment: "bottomRight",
      bottomMargin: 100,
      rightMargin: 10
    });

    const IfcAPI = new WebIFC.IfcAPI();

    IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.55/");

    IfcAPI.Init().then(() => {

      const ifcLoader = new WebIFCLoaderPlugin(viewer, {
        WebIFC,
        IfcAPI
      });

      const sceneModel = ifcLoader.load({
        id: "myModel",
        // src: "./rac_advanced_sample_project.ifc",
        src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
        // src: "./IfcOpenHouse4.ifc",
        // loadMetadata: false, // <<------- Don't load IFC metadata
        edges: true
      });

      sceneModel.on("loaded", () => {
        viewer.cameraFlight.jumpTo(sceneModel);
      });

      const timeElement = document.getElementById("time")!;

      const t0 = performance.now();
      timeElement.innerHTML = "Loading model...";
      sceneModel.on("loaded", function () {
        const t1 = performance.now();
        timeElement.innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
      });
    });
  }, []);


  return (
    <div className="w-full h-full">
      {/* <input type="checkbox" id="info-button" /> */}
      <label htmlFor="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
      <canvas id="myCanvas"></canvas>
      {/*
        #myNavCubeCanvas {
            position: absolute;
            width: 250px;
            height: 250px;
            bottom: 50px;
            right: 10px;
            z-index: 200000;
        } */}
      {/* to tailwind classes */}
      <canvas id="myNavCubeCanvas" className="absolute w-[250px] h-[250px] bottom-[50px] right-[10px] z-[200000]"></canvas>
      <div className="slideout-sidebar hidden">
        <img className="info-icon" src="../../assets/images/bim_icon.png" />
        <h1>WebIFCLoaderPlugin</h1>
        <h2>Loading an IFC File</h2>
        <p><a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
          target="_other">WebIFCLoaderPlugin</a> is the easiest way to load IFC models into a xeokit Viewer.</p>
        <p>WebIFCLoaderPlugin loads IFC STEP files and parses them within the browser using <a
          href="https://github.com/tomvandig/web-ifc"
          target="_other">web-ifc</a>, to create 3D objects within the
          Viewer.</p>

        <h3>Limitations</h3>
        <p>Loading and parsing huge IFC STEP files can be slow, and can overwhelm the browser, however. To view your
          largest IFC models, we recommend instead pre-converting those to xeokit's compressed native .XKT format, then
          loading them with <a href="../../docs/className/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js~XKTLoaderPlugin.html"
            target="_other">XKTLoaderPlugin</a>.</p>
        <h3>Stats</h3>
        <ul>
          <li>
            <div id="time">Loading JavaScript modules...</div>
          </li>
        </ul>
        <h3>Components used</h3>
        <ul>
          <li>
            <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
              target="_other">Viewer</a>
          </li>
          <li>
            <a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
              target="_other">WebIFCLoaderPlugin</a>
          </li>
          <li>
            <a href="../../docs/className/src/plugins/NavCubePlugin/NavCubePlugin.js~NavCubePlugin.html"
              target="_other">NavCubePlugin</a>
          </li>
        </ul>
        <h3>Assets</h3>
        <ul>
          <li>
            <a href="http://openifcmodel.cs.auckland.ac.nz/Model/Details/274"
              target="_other">Model source</a>
          </li>
        </ul>
      </div>
    </div>
  )
};