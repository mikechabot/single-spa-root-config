import { MyOrg } from "./types";

export {};

declare global {
  interface Window {
    MyOrg: MyOrg;
    CustomEvent: any;
  }
}
