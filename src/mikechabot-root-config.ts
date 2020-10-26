import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@mikechabot/player-card",
  app: () => System.import("@mikechabot/player-card"),
  activeWhen: (location) => {
    // eslint-disable-next-line no-console
    console.log(location);
    return true;
  },
  customProps: { customProp1: "foobar!" },
});

start({
  urlRerouteOnly: true,
});
