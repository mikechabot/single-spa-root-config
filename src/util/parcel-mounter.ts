import { mountRootParcel, ParcelConfig } from "single-spa";

import { MyOrgModule } from "../types";
import { addMountContainer } from "./dom-helpers";

const remoteImport = (moduleName) => System.import(moduleName);

/**
 * Mount a parcel
 * @param moduleName
 * @param mountId
 * @param componentProps
 */
export const mountParcel = async (
  moduleName: string,
  mountId: string,
  componentProps: any
) => {
  try {
    const { bootstrap, mount, unmount } = await remoteImport(moduleName);
    const parcelConfig: ParcelConfig = { bootstrap, mount, unmount };
    const parcelProps = {
      moduleName,
      domElement: addMountContainer(mountId),
      ...componentProps,
    };
    return mountRootParcel(parcelConfig, parcelProps);
  } catch (e) {
    console.error(e);
    return;
  }
};
