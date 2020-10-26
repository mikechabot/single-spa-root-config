import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@mikechabot/player-card",
  app: () => System.import("//localhost:8080/mikechabot-player-card.js"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
