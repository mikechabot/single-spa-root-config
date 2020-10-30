import { Parcel } from "single-spa";

export enum MyOrgEvent {
  Mounted = "MyOrg:mounted",
}

export enum MyOrgModule {
  TestApplication = "@mikechabot/test-application",
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

export interface MyOrg {
  testApplication: MicroUi;
}
