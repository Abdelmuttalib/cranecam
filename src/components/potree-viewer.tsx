import { useEffect, useRef } from "react";

type PointcloudNavigatorProps = {
  pointCloudUrl: string;
};

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;
console.log("Potree: ", Potree);

export default function PointcloudNavigator({
  pointCloudUrl,
}: PointcloudNavigatorProps) {
  const potreeContainerDiv = useRef();

  // const [pointCloudUrl, setPointcloudUrl] = useState(
  //   pointCloudUrl
  //   // "http://47.97.51.98:6093/temp/2024-02-25/J72304752/perugia/pointclouds/perugia/metadata.json"
  // );

  useEffect(() => {
    // initialize Potree viewer
    const viewerElem = potreeContainerDiv.current;

    const viewer = new Potree.Viewer(viewerElem);

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
    // let url = pointCloudUrl;
    // "https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.js";
    /* ***PUT YOUR POINTCLOUD URL*** HERE */
    Potree.loadPointCloud(pointCloudUrl).then(
      (e) => {
        //let scene = viewer.scene;
        let pointcloud = e.pointcloud;
        let material = pointcloud.material;

        material.activeAttributeName = "rgba";
        material.minSize = 2;
        material.pointSizeType = Potree.PointSizeType.FIXED;

        viewer.scene.addPointCloud(pointcloud);

        viewer.fitToScreen();

        console.log("This is the url", pointCloudUrl);
      },
      (e) => console.err("ERROR: ", e)
    );


    return () => {
      // Cleanup
      console.log('Disposing viewer:', viewer);
      if (viewer && typeof viewer.dispose === 'function') {
        viewer.dispose();
      } else {
        console.error('Viewer dispose method not found or viewer is null');
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

  return (
    <>
      <div id="potree-root">
      
      {/*<div className="absolute top-0 right-0 w-72 h-72 z-50 border">
      <div id="scene_export"></div>
      </div>*/}

        <div
          className="potree_container bg-black flex h-screen flex-col relative"
        >
          <div id="potree_render_area" ref={potreeContainerDiv}></div>
          <div id="potree_sidebar_container" className="bg-blue-400"></div>
        </div>
      </div>
    </>
  );
}
