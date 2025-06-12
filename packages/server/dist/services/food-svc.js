import { Schema, model } from 'mongoose';
const FoodSchema = new Schema({
    id: { type: Number, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    restaurant: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    rating: { type: Number, required: true },
}, { collection: 'foods' });
const FoodModel = model('Food', FoodSchema);
function index() {
    return FoodModel.find();
}
function get(id) {
    return FoodModel.findOne({ id }).then((food) => {
        if (!food)
            throw `${id} Not Found`;
        return food;
    });
}
function create(food) {
    const newFood = new FoodModel(food);
    return newFood.save();
}
function update(id, food) {
    return FoodModel.findOneAndUpdate({ id }, food, { new: true }).then((updatedFood) => {
        if (!updatedFood)
            throw `${id} Not Found`;
        return updatedFood;
    });
}
function remove(id) {
    return FoodModel.findOneAndDelete({ id }).then((deletedFood) => {
        if (!deletedFood)
            throw `${id} Not Found`;
    });
}
export default { index, get, create, update, remove };
