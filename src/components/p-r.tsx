/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta name="description" content="" />
//     <meta name="author" content="" />
//     <meta
//       name="viewport"
//       content="width=device-width, initial-scale=1.0, user-scalable=no"
//     />
//     <title>Potree Viewer</title>

import { useEffect, useState } from 'react';

import { getDefectSummaryDataV2 } from '@/lib/defect-data';

import { coordinatesData } from '@/data/ann';
import { annotationsDefectsData } from '@/data/pdata';

//     <link rel="stylesheet" type="text/css" href="/sbs/potree.css" />
//     <!-- <link
//       rel="stylesheet"
//       type="text/css"
//       href="/build/potree/potree.css"
//     /> -->
//     <link
//       rel="stylesheet"
//       type="text/css"
//       href="/libs/jquery-ui/jquery-ui.min.css"
//     />
//     <link
//       rel="stylesheet"
//       type="text/css"
//       href="/libs/openlayers3/ol.css"
//     />
//     <link
//       rel="stylesheet"
//       type="text/css"
//       href="/libs/spectrum/spectrum.css"
//     />
//     <link
//       rel="stylesheet"
//       type="text/css"
//       href="/libs/jstree/themes/mixed/style.css"
//     />
//   </head>

//   <body>
//     <script strategy="beforeInteractive" src="/libs/jquery/jquery-3.1.1.min.js"></script>
//     <script strategy="beforeInteractive" src="/libs/spectrum/spectrum.js"></script>
//     <script strategy="beforeInteractive" src="/libs/jquery-ui/jquery-ui.min.js"></script>
//     <script strategy="beforeInteractive" src="/libs/other/BinaryHeap.js"></script>
//     <script strategy="beforeInteractive" src="/libs/tween/tween.min.js"></script>
//     <script strategy="beforeInteractive" src="/libs/d3/d3.js"></script>
//     <script strategy="beforeInteractive" src="/libs/proj4/proj4.js"></script>
//     <script strategy="beforeInteractive" src="/libs/openlayers3/ol.js"></script>
//     <script strategy="beforeInteractive" src="/libs/i18next/i18next.js"></script>
//     <script strategy="beforeInteractive" src="/libs/jstree/jstree.js"></script>
//     <!-- <script strategy="beforeInteractive" src="/build/potree/potree.js"></script> -->
//     <script strategy="beforeInteractive"
//       type="text/javascript"
//       src="/resources/scripts/mjs.min.js"
//     ></script>
//     <script strategy="beforeInteractive" type="text/javascript" src="/sbs/potree.js"></script>
//     <script strategy="beforeInteractive" src="/libs/plasio/js/laslaz.js"></script>

//     <!-- INCLUDE ADDITIONAL DEPENDENCIES HERE -->
//     <!-- INCLUDE SETTINGS HERE -->

//     <script strategy="beforeInteractive" type="module">
//       window.viewer = new Potree.Viewer(
//         document.getElementById("potree_render_area")
//       );
//       // curl -O http://{ip}:4030/converted/${name}/metadata.json
//       // curl -O http://http://47.97.17.32/:4030/converted/cloudABBBB/metadata.json

//       viewer.setServer("http://localhost:5000");
//       viewer.setEDLEnabled(true);
//       viewer.setFOV(60);
//       viewer.setPointBudget(9_000_000);
//       viewer.loadSettingsFromURL();

//       viewer.setDescription("Loading Octree of LAS files");

//       viewer.loadGUI(() => {
//         // viewer.setLanguage("en");
//         // $("#menu_appearance").next().show();
//         // viewer.toggleSidebar();
//       });

//       // Sigeom
//       // Potree.loadPointCloud(
//       //   "",
//       //   "lion",
//       //   function (e) {
//       //     viewer.scene.addPointCloud(e.pointcloud);

//       //     let material = e.pointcloud.material;
//       //     material.size = 1;
//       //     material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

//       //     e.pointcloud.position.x += 3;
//       //     e.pointcloud.position.y -= 3;
//       //     e.pointcloud.position.z += 4;

//       //     viewer.fitToScreen();
//       //   }
//       // );

//       //"http://170.64.201.209/objects/terra_las/converted/cloudABBBY/metadata.json"

//       var data = [
//         "cloudABBBB",
//         "cloudABBYY",
//         "cloudABYYC",
//         "cloudAYBCZ",
//         "cloudAYBZY",
//         "cloudAYYYB",
//         "cloudXBACA",
//         "cloudXBAZX",
//         "cloudXBXXA",
//         "cloudXYABY",
//         "cloudABBBY",
//         "cloudABYBA",
//         "cloudABYYZ",
//         "cloudAYBZBA",
//         "cloudAYYBC",
//         "cloudAYYYYA",
//         "cloudXBACX",
//         "cloudXBXAA",
//         "cloudXBXXX",
//         "cloudABBYB",
//         "cloudABYBX",
//         "cloudAYBCC",
//         "cloudAYBZBX",
//         "cloudAYYBZ",
//         "cloudAYYYYX",
//         "cloudXBAZA",
//         "cloudXBXAX",
//         "cloudXYABB",
//       ];

//       for (var i in data) {
//         Potree.loadPointCloud(
//           `http://170.64.201.209:4001/${data[i]}/metadata.json`,
//           "lion",
//           (e) => {
//             let pointcloud = e.pointcloud;
//             console.log(`pc: ${JSON.stringify(pointcloud)}`);
//             // let material = pointcloud.material;
//             // console.log(`material: ${material}`)
//             // material.activeAttributeName = "rgba";
//             // material.minSize = 2;
//             // material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

//             viewer.scene.addPointCloud(pointcloud);
//             viewer.fitToScreen();
//             viewer.setClassifications({});
//           }
//         );
//       }
//     </script>

//     <div
//       class="potree_container"
//       style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px"
//     >
//       <div id="potree_render_area"></div>
//       <div id="potree_sidebar_container"></div>
//     </div>
//   </body>
// </html>

// <!-- style="
//           background-image: url('/build/potree/resources/images/background.jpg');
//         " -->

interface global {
  viewer: any;
}

export default function PotreeHtml() {
  const [initialized, setInitialized] = useState(false);
  const [show, setShow] = useState(false);

  const [markerData, setMarkerData] = useState();

  useEffect(() => {
    if (initialized) {
      // console.log('useEffect called: Updating...');
      return;
    }

    function initializeViewer() {
      if (!window.viewer) {
        window.viewer = new Potree.Viewer(
          document.getElementById('potree_render_area')
        );
      }
    }

    initializeViewer();

    // curl -O http://{ip}:4030/converted/${name}/metadata.json
    // curl -O http://http://47.97.17.32/:4030/converted/cloudABBBB/metadata.json

    const viewer = window.viewer;

    viewer.setServer('http://localhost:5000');
    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(9_000_000);
    viewer.loadSettingsFromURL();
    // viewer.setBackground('skybox');

    // viewer.setDescription('Loading Octree of LAS files');
    // viewer.setDescription('Venetian Model');

    viewer.loadGUI(() => {
      // viewer.setLanguage("en");
      // $("#menu_appearance").next().show();
      // viewer.toggleSidebar();
    });

    // Sigeom
    // Potree.loadPointCloud(
    //   "",
    //   "lion",
    //   function (e) {
    //     viewer.scene.addPointCloud(e.pointcloud);

    //     let material = e.pointcloud.material;
    //     material.size = 1;
    //     material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

    //     e.pointcloud.position.x += 3;
    //     e.pointcloud.position.y -= 3;
    //     e.pointcloud.position.z += 4;

    //     viewer.fitToScreen();
    //   }
    // );

    //"http://170.64.201.209/objects/terra_las/converted/cloudABBBY/metadata.json"

    const data = [
      // 'cloudABBBB',
      // 'cloudABBYY',
      // 'cloudABYYC',
      // 'cloudAYBCZ',
      // 'cloudAYBZY',
      // 'cloudAYYYB',
      // 'cloudXBACA',
      // 'cloudXBAZX',
      // 'cloudXBXXA',
      // 'cloudXYABY', // => cleanup, roof
      // 'cloudABBBY',
      // 'cloudABYBA',
      // 'cloudABYYZ',
      // 'cloudAYBZBA',
      // 'cloudAYYBC',
      // 'cloudAYYYYA',
      // 'cloudXBACX',
      // 'cloudXBXAA', // 1st
      // 'cloudXBXXX',
      // 'cloudABBYB',
      // 'cloudABYBX',
      // 'cloudAYBCC',
      // 'cloudAYBZBX',
      // 'cloudAYYBZ',
      // 'cloudAYYYYX',
      // 'cloudXBAZA',
      // 'cloudXBXAX',
      // 'cloudXYABB',
      '威尼斯人',
    ];

    // 威尼斯人

    // for (const i in data) {
    Potree.loadPointCloud(
      // `http://170.64.201.209:4001/${data[i]}/metadata.json`,
      // `http://47.97.17.32:4030/converted/${data[i]}/metadata.json`,
      // https://model.macau.invix.tech/converted/cloudABBBB/metadata.json
      // `https://model.macau.invix.tech/converted/${data[i]}/metadata.json`,
      `https://model.macau.invix.tech/converted/威尼斯人/metadata.json`,
      // `https://model.macau.invix.tech/output/metadata.json`,
      'lion',
      (e) => {
        const pointcloud = e.pointcloud;

        // coordinatesData.forEach((coord, indx) => {
        //   const img = coord.imageName.replace('.jpg', '');
        //   const defectData = annotationsDefectsData[img];

        //   function getDS() {
        //     let all =
        //       '<div style="background-color: black; opacity: 1; display: flex; flex-direction: column; justify-content: center; font-size: 16px;"><div style="background-color: black; opacity: 1; position: relative; width: 70%; height: 200px;">';

        //     defectData?.map((d, indx) => {
        //       const dsd = getDefectSummaryData(d);
        //       if (indx === 0) {
        //         all += `<img src="${dsd?.imageSrc}" style="width: 100%; height: 100%; opacity: 1;"><div style="width: 45px; height: 100%; background-color: black; position: absolute; right: 0; bottom: 0; top: 0;"></div><br></div><div style="background-color: black; opacity: 1; display: flex; flex-direction: column;">`;
        //       }

        //       const dwws = `
        //       Defect ID: ${dsd?.defectId}. <br>
        //       Building: ${dsd?.location}. <br>
        //       Defect Area: ${dsd?.area} &#13217;. <br>
        //       Defect Category: ${dsd?.defectsObj
        //         .map((d) => d.type)
        //         .join(' ,')}. <br>
        //       ${defectData?.length !== indx + 1 ? '<hr>' : ''}
        //       `;

        //       // Defect Description: ${dsd?.defectsObj
        //       //   .map((d) => `- ${d.description}`)
        //       //   .join(' ,')}. <br>

        //       if (
        //         defectData &&
        //         indx > 0 &&
        //         defectData[indx - 1] &&
        //         defectData[indx - 1].image._id === dsd?.defectId
        //       ) {
        //         return;
        //       }

        //       all += dwws;
        //     });

        //     return all + '</div></div>';
        //   }

        //   const desc = getDS();

        //   const a = new Potree.Annotation({
        //     position: [coord.x, coord.y, coord.z],
        //     title: `dsfsdfdf`,
        //     description: `desc`,
        //   });
        //   viewer.scene.annotations.add(a);
        // });
        // Function to add a circular marker to the scene
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
            // console.log('Marker clicked!', position, e);
            // Add your custom actions here

            const clickedMarkerData = coordinatesData.find(
              (coord) =>
                coord.x === position.x &&
                coord.y === position.y &&
                coord.z === position.z
            );

            // console.log('clickedMarkerData: ', clickedMarkerData);

            if (clickedMarkerData) {
              const img = clickedMarkerData.imageName.replace('.jpg', '');
              const defectData = annotationsDefectsData[img];
              // console.log('defectData: ', defectData);
            }
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
          marker.addEventListener('mouseover', () => {
            // console.log('Marker hovered!', position);
            // Add your custom actions here for mouse enter

            setShow(true);

            const clickedMarkerData = coordinatesData.find(
              (coord) =>
                coord.x === position.x &&
                coord.y === position.y &&
                coord.z === position.z
            );

            // console.log('clickedMarkerData: ', clickedMarkerData);

            if (clickedMarkerData) {
              const img = clickedMarkerData.imageName.replace('.jpg', '');
              const defectData = annotationsDefectsData[img];
              // console.log('defectData: ', defectData);
              setMarkerData(defectData);
            }
          });

          marker.addEventListener('mouseleave', () => {
            // console.log('Marker unhovered!', position);
            // Add your custom actions here for mouse leave
            setShow(false);
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

          const mouse = new THREE.Vector2();
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, window.viewer.scene.getActiveCamera());

          const intersects = raycaster.intersectObjects(
            window.viewer.scene.scene.children,
            true
          );

          for (let i = 0; i < intersects.length; i++) {
            const object = intersects[i].object;
            if (object.userData.onClick) {
              object.userData.onClick();
              break;
            }
          }
        }

        // Attach click event listener to the document
        document.addEventListener('click', onClick, false);

        // Loop through your coordinatesData and add markers
        coordinatesData.forEach((coord) => {
          const markerPosition = new THREE.Vector3(coord.x, coord.y, coord.z);
          const markerRadius = 1; // Adjust the radius as needed
          addMarker(markerPosition, markerRadius);
        });

        // viewer.scene.on('click', function (event) {
        //   // code goes here.

        //   const position = event.parent.getLocation();
        //   console.log('position: ', position);
        //   //fire function to get user input from modal
        //   // the user input modal function will have this event passed which will give it the location
        //   // use event function to add annotation to sccene
        // });

        // console.log(`pc: ${JSON.stringify(pointcloud)}`);
        const material = pointcloud.material;
        // console.log(`material: `, material);
        material.activeAttributeName = 'rgba';
        material.minSize = 0.5;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

        viewer.scene.addPointCloud(pointcloud);
        viewer.fitToScreen();
        viewer.setClassifications({});
      }
    );
    // }

    setInitialized(true);

    // return () => {
    //   viewer.dispose();
    // };
  }, []);

  return (
    <>
      {/* renderer */}
      <div
        id='potree-root'
        className='h-main'
        // style={{
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   width: '100%',
        // }}
      >
        <div
          className='potree_container h-main w-screen'
          // style={{
          //   // position: 'absolute',
          //   // left: '0px',
          //   // top: '0px',
          //   // position: 'relative',
          //   width: '100%',
          //   height: '82vh',
          //   margin: '0 auto',
          //   // paddingLeft: '2rem',
          // }}
        >
          <div id='potree_render_area' className='relative h-full w-full'></div>
        </div>
      </div>
    </>
  );
}
