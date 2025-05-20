"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var reviewer_svc_exports = {};
__export(reviewer_svc_exports, {
  default: () => reviewer_svc_default
});
module.exports = __toCommonJS(reviewer_svc_exports);
var import_mongoose = require("mongoose");
const ReviewerSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    bio: { type: String, trim: true },
    profileImage: { type: String, trim: true },
    joinDate: { type: Date, required: true, default: Date.now },
    totalReviews: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, required: true, default: 0 },
    favoriteCuisines: [{ type: String, trim: true }],
    location: { type: String, required: true, trim: true },
    isVerified: { type: Boolean, required: true, default: false }
  },
  { collection: "reviewers" }
);
const ReviewerModel = (0, import_mongoose.model)("Reviewer", ReviewerSchema);
function index() {
  return ReviewerModel.find();
}
function get(id) {
  return ReviewerModel.findOne({ id }).then((reviewer) => {
    if (!reviewer) throw `${id} Not Found`;
    return reviewer;
  });
}
function create(reviewer) {
  const newReviewer = new ReviewerModel(reviewer);
  return newReviewer.save();
}
function update(id, reviewer) {
  return ReviewerModel.findOneAndUpdate({ id }, reviewer, { new: true }).then(
    (updatedReviewer) => {
      if (!updatedReviewer) throw `${id} Not Found`;
      return updatedReviewer;
    }
  );
}
function remove(id) {
  return ReviewerModel.findOneAndDelete({ id }).then((deletedReviewer) => {
    if (!deletedReviewer) throw `${id} Not Found`;
  });
}
function findByUsername(username) {
  return ReviewerModel.findOne({ username }).then((reviewer) => {
    if (!reviewer) throw `Reviewer with username ${username} Not Found`;
    return reviewer;
  });
}
function updateStats(id, newRating) {
  return ReviewerModel.findOne({ id }).then((reviewer) => {
    if (!reviewer) throw `${id} Not Found`;
    const newTotalReviews = reviewer.totalReviews + 1;
    const newAverageRating = (reviewer.averageRating * reviewer.totalReviews + newRating) / newTotalReviews;
    return ReviewerModel.findOneAndUpdate(
      { id },
      {
        totalReviews: newTotalReviews,
        averageRating: newAverageRating
      },
      { new: true }
    );
  });
}
var reviewer_svc_default = {
  index,
  get,
  create,
  update,
  remove,
  findByUsername,
  updateStats
};
