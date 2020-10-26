import { registerApplication, start, mountRootParcel } from "single-spa";

// registerApplication({
//   name: "@mikechabot/player-card",
//   app: () => System.import("@mikechabot/player-card"),
//   activeWhen: (location) => {
//     return true;
//   },
//   customProps: { customProp1: "foobar!" },
// });
//
// start({
//   urlRerouteOnly: true,
// });

const mountId = "some-div-to-mount-in";
const moduleName = "@mikechabot/player-card";

let parcel;

document.addEventListener("mount-component", (event: CustomEvent) => {
  System.import(moduleName).then((app1) => {
    const parcelConfig = {
      bootstrap: app1.bootstrap,
      mount: app1.mount,
      unmount: app1.unmount,
    };

    const domElement = document.getElementById(mountId);
    const parcelProps = {
      domElement,
      moduleName,
      mountId,
      customProp1: "foo!",
    };

    parcel = mountRootParcel(parcelConfig, parcelProps);

    parcel.mountPromise.then(() => {
      // eslint-disable-next-line no-console
      console.log("mounted!");
    });
  });
});

document.addEventListener("unmount-component", () => {
  // eslint-disable-next-line no-console
  console.log("Programmatically unmounting node");
  parcel.unmount();
});
