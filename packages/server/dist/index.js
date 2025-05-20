"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_food_svc = __toESM(require("./services/food-svc"));
var import_reviewer_svc = __toESM(require("./services/reviewer-svc"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mongo.connect)("csc437");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.get("/api/foods", (req, res) => {
  import_food_svc.default.index().then((foods) => res.json(foods)).catch((err) => res.status(500).json({ error: err.toString() }));
});
app.get("/api/foods/:id", (req, res) => {
  const { id } = req.params;
  import_food_svc.default.get(id).then((food) => res.json(food)).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.post("/api/foods", (req, res) => {
  import_food_svc.default.create(req.body).then((food) => res.status(201).json(food)).catch((err) => res.status(400).json({ error: err.toString() }));
});
app.put("/api/foods/:id", (req, res) => {
  const { id } = req.params;
  import_food_svc.default.update(id, req.body).then((food) => res.json(food)).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.delete("/api/foods/:id", (req, res) => {
  const { id } = req.params;
  import_food_svc.default.remove(id).then(() => res.status(204).send()).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.get("/api/reviewers", (req, res) => {
  import_reviewer_svc.default.index().then((reviewers) => res.json(reviewers)).catch((err) => res.status(500).json({ error: err.toString() }));
});
app.get("/api/reviewers/:id", (req, res) => {
  const { id } = req.params;
  import_reviewer_svc.default.get(id).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.get("/api/reviewers/username/:username", (req, res) => {
  const { username } = req.params;
  import_reviewer_svc.default.findByUsername(username).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.post("/api/reviewers", (req, res) => {
  import_reviewer_svc.default.create(req.body).then((reviewer) => res.status(201).json(reviewer)).catch((err) => res.status(400).json({ error: err.toString() }));
});
app.put("/api/reviewers/:id", (req, res) => {
  const { id } = req.params;
  import_reviewer_svc.default.update(id, req.body).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.delete("/api/reviewers/:id", (req, res) => {
  const { id } = req.params;
  import_reviewer_svc.default.remove(id).then(() => res.status(204).send()).catch((err) => res.status(404).json({ error: err.toString() }));
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
