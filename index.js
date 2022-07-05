const session = require("express-session");
const Keycloak = require("keycloak-connect");
const express = require("express");

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const app = express();

app.use(keycloak.middleware());

app.get("/", (req, res) => {
  res.send("App Running");
});

app.get("/user", keycloak.protect("user"), (req, res) => {
  console.log("Worked")
  res.send("User approved");
});

app.listen(3000);
