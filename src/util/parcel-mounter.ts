import { mountRootParcel, ParcelConfig } from "single-spa";

import { DkLiveModule } from "../types";
import { addMountContainer } from "./dom-helpers";

const remoteImport = (moduleName) => System.import(moduleName);

/**
 * Mount a parcel
 * @param moduleName
 * @param mountId
 * @param componentProps
 */
export const mountParcel = (
  moduleName: string,
  mountId: string,
  componentProps: any
) => {
  return remoteImport(moduleName)
    .then(({ bootstrap, mount, unmount }) => {
      const parcelConfig: ParcelConfig = { bootstrap, mount, unmount };
      const parcelProps = {
        moduleName,
        domElement: addMountContainer(mountId),
        ...componentProps,
      };
      return mountRootParcel(parcelConfig, parcelProps);
    })
    .catch((e) => {
      console.error(e);
      return undefined;
    });
};
