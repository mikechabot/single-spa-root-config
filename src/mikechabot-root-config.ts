import { mountParcel } from "./util/parcel-mounter";

import { MyOrgModule, MyOrgEvent, MyOrg, ComponentProps } from "./types";

import "./util/custom-event";

window.MyOrg = window.MyOrg = {} as MyOrg;

window.MyOrg.testApplication = {
  name: MyOrgModule.TestApplication,
  mount: (mountId, componentProps: ComponentProps) =>
    mountParcel(MyOrgModule.TestApplication, mountId, componentProps),
};

/**
 * Emit a custom event so consumers can mount MyOrg modules
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
const event = new CustomEvent(MyOrgEvent.Mounted);
window.dispatchEvent(event);
