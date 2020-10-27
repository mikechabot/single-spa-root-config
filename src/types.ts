import { Parcel } from "single-spa";

export enum DkLiveEvent {
  Mounted = "DkLiveExperience:mounted",
}

export enum DkLiveModule {
  PlayerCard = "@mikechabot/player-card",
}

export interface ComponentProps {
  [key: string]: any;
}

export interface MicroUi {
  name: string;
  mount: (
    mountId: string,
    props: ComponentProps
  ) => Promise<Parcel | undefined>;
}

export interface DkLiveExperience {
  playerCard: MicroUi;
}
