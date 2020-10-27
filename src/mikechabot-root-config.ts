import { mountParcel } from "./util/parcel-mounter";
import {
  DkLiveModule,
  DkLiveEvent,
  DkLiveExperience,
  ComponentProps,
} from "./types";

import "./util/custom-event";

const detail: DkLiveExperience = {} as DkLiveExperience;

detail.playerCard = {
  name: DkLiveModule.PlayerCard,
  mount: (mountId, componentProps: ComponentProps) =>
    mountParcel(DkLiveModule.PlayerCard, mountId, componentProps),
};

/**
 * Emit a custom event so consumers can mount DKLiveExperience modules
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
const eventInitDict = { detail };
const event = new CustomEvent(DkLiveEvent.Mounted, eventInitDict);
window.dispatchEvent(event);
