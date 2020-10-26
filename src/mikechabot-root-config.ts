import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@mikechabot/player-card",
  app: () => System.import("@mikechabot/player-card"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
