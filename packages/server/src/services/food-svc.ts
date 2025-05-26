import { Schema, model } from 'mongoose'
import { Food } from '../models/food'

const FoodSchema = new Schema<Food>(
	{
		id: { type: Number, required: true, trim: true, unique: true },
		title: { type: String, required: true, trim: true },
		imageUrl: { type: String, required: true, trim: true },
		price: { type: String, required: true, trim: true },
		restaurant: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		rating: { type: Number, required: true },
	},
	{ collection: 'foods' }
)

const FoodModel = model<Food>('Food', FoodSchema)

function index(): Promise<Food[]> {
	return FoodModel.find()
}

function get(id: string): Promise<Food> {
	return FoodModel.findOne({ id }).then((food) => {
		if (!food) throw `${id} Not Found`
		return food
	})
}

function create(food: Food): Promise<Food> {
	const newFood = new FoodModel(food)
	return newFood.save()
}

function update(id: string, food: Partial<Food>): Promise<Food> {
	return FoodModel.findOneAndUpdate({ id }, food, { new: true }).then(
		(updatedFood) => {
			if (!updatedFood) throw `${id} Not Found`
			return updatedFood
		}
	)
}

function remove(id: string): Promise<void> {
	return FoodModel.findOneAndDelete({ id }).then((deletedFood) => {
		if (!deletedFood) throw `${id} Not Found`
	})
}

export default { index, get, create, update, remove }
