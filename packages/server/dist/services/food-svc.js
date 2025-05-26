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
var food_svc_exports = {};
__export(food_svc_exports, {
  default: () => food_svc_default
});
module.exports = __toCommonJS(food_svc_exports);
var import_mongoose = require("mongoose");
const FoodSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    restaurant: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    rating: { type: Number, required: true }
  },
  { collection: "foods" }
);
const FoodModel = (0, import_mongoose.model)("Food", FoodSchema);
function index() {
  return FoodModel.find();
}
function get(id) {
  return FoodModel.findOne({ id }).then((food) => {
    if (!food) throw `${id} Not Found`;
    return food;
  });
}
function create(food) {
  const newFood = new FoodModel(food);
  return newFood.save();
}
function update(id, food) {
  return FoodModel.findOneAndUpdate({ id }, food, { new: true }).then(
    (updatedFood) => {
      if (!updatedFood) throw `${id} Not Found`;
      return updatedFood;
    }
  );
}
function remove(id) {
  return FoodModel.findOneAndDelete({ id }).then((deletedFood) => {
    if (!deletedFood) throw `${id} Not Found`;
  });
}
var food_svc_default = { index, get, create, update, remove };
