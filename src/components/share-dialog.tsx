import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { CopyIcon, Share2 } from "lucide-react";

export function ShareDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const url = window ? window.location.href : "";

  function copyToClipboard() {
    navigator.clipboard.writeText(url).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  return (
    <>
      {/* <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Open dialog
      </button> */}
      <Button onClick={openModal}>
        <span className="flex items-center gap-x-2">
          <Share2 className="w-[17px]" />
          <span>Share</span>
        </span>
      </Button>
      {/* <Button
       
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Share
      </Button> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Share "Construction site"
                  </Dialog.Title>
                  <div className="mt-6 flex items-center gap-x-2">
                    <input
                      type="text"
                      value={url}
                      disabled
                      className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-400 border-zinc-800 text-white/90 focus:outline-none"
                    />
                    <Button
                      //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="space-x-1.5 active:bg-zinc-400"
                    >
                      <CopyIcon className="w-4" />
                      <span>Copy</span>
                    </Button>
                    {/* <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p> */}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Done
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
//   Transition,
// } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { Button } from "./ui/button";

// export function ShareDialog() {
//   const [isOpen, setIsOpen] = useState(false);

//   function open() {
//     setIsOpen(true);
//   }

//   function close() {
//     setIsOpen(false);
//   }

//   //   get full url
//   const url = window.location.href;

//   //   copy action for url

//   function copyToClipboard() {
//     navigator.clipboard.writeText(url).then(
//       function () {
//         console.log("Async: Copying to clipboard was successful!");
//       },
//       function (err) {
//         console.error("Async: Could not copy text: ", err);
//       }
//     );
//   }

//   return (
//     <>
//       <Button
//         onClick={open}
//         // className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
//       >
//         Open dialog
//       </Button>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           open={isOpen}
//           as="div"
//           className="relative z-10 focus:outline-none"
//           onClose={close}
//           __demoMode
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             {/* <div className="fixed inset-0 bg-black/25" /> */}
//             {/*  z-10 */}
//             <div className="fixed inset-0 w-screen overflow-y-auto bg-black/60" />
//           </Transition.Child>
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <DialogPanel
//                   transition
//                   className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 space-y-7"
//                 >
//                   <DialogTitle
//                     as="h3"
//                     className="text-base/7 font-medium text-white"
//                   >
//                     Share "Construction site with DXF/IFC files"
//                   </DialogTitle>
//                   <div className="flex items-center gap-x-2">
//                     <input
//                       type="text"
//                       value={url}
//                       disabled
//                       className="w-full p-2 rounded-md bg-white/10 text-white/90 focus:outline-none"
//                     />
//                     <Button
//                     //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
//                       onClick={copyToClipboard}
//                     >
//                       Copy
//                     </Button>
//                   </div>
//                   {/* <p className="mt-2 text-sm/6 text-white/50">
//                 Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
//                 order.
//               </p> */}

//                   <div className="mt-4 flex justify-end">
//                     <Button
//                       className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
//                       onClick={close}
//                     >
//                       Done
//                     </Button>
//                   </div>
//                 </DialogPanel>
//               </Transition.Child>
//             </div>
//           </div>
//           {/* </div> */}
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
