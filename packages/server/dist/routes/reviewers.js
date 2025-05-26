"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var reviewers_exports = {};
__export(reviewers_exports, {
  default: () => reviewers_default
});
module.exports = __toCommonJS(reviewers_exports);
var import_express = __toESM(require("express"));
var import_reviewer_svc = __toESM(require("../services/reviewer-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_reviewer_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).json({ error: err.toString() }));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_reviewer_svc.default.get(id).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
router.get("/username/:username", (req, res) => {
  const { username } = req.params;
  import_reviewer_svc.default.findByUsername(username).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
router.post("/", (req, res) => {
  const newReviewer = req.body;
  import_reviewer_svc.default.create(newReviewer).then((reviewer) => res.status(201).json(reviewer)).catch((err) => res.status(400).json({ error: err.toString() }));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedReviewer = req.body;
  import_reviewer_svc.default.update(id, updatedReviewer).then((reviewer) => res.json(reviewer)).catch((err) => res.status(404).json({ error: err.toString() }));
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  import_reviewer_svc.default.remove(id).then(() => res.status(204).send()).catch((err) => res.status(404).json({ error: err.toString() }));
});
var reviewers_default = router;
