import { Schema, model } from 'mongoose'
import { Reviewer } from '../models/reviewer'

const ReviewerSchema = new Schema<Reviewer>(
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
		isVerified: { type: Boolean, required: true, default: false },
	},
	{ collection: 'reviewers' }
)

const ReviewerModel = model<Reviewer>('Reviewer', ReviewerSchema)

function index(): Promise<Reviewer[]> {
	return ReviewerModel.find()
}

function get(id: string): Promise<Reviewer> {
	return ReviewerModel.findOne({ id }).then((reviewer) => {
		if (!reviewer) throw `${id} Not Found`
		return reviewer
	})
}

function create(reviewer: Reviewer): Promise<Reviewer> {
	const newReviewer = new ReviewerModel(reviewer)
	return newReviewer.save()
}

function update(id: string, reviewer: Partial<Reviewer>): Promise<Reviewer> {
	return ReviewerModel.findOneAndUpdate({ id }, reviewer, { new: true }).then(
		(updatedReviewer) => {
			if (!updatedReviewer) throw `${id} Not Found`
			return updatedReviewer
		}
	)
}

function remove(id: string): Promise<void> {
	return ReviewerModel.findOneAndDelete({ id }).then((deletedReviewer) => {
		if (!deletedReviewer) throw `${id} Not Found`
	})
}

// Additional helper functions
function findByUsername(username: string): Promise<Reviewer> {
	return ReviewerModel.findOne({ username }).then((reviewer) => {
		if (!reviewer) throw `Reviewer with username ${username} Not Found`
		return reviewer
	})
}

function updateStats(id: string, newRating: number): Promise<Reviewer> {
	return ReviewerModel.findOne({ id }).then((reviewer) => {
		if (!reviewer) throw `${id} Not Found`

		const newTotalReviews = reviewer.totalReviews + 1
		const newAverageRating =
			(reviewer.averageRating * reviewer.totalReviews + newRating) /
			newTotalReviews

		return ReviewerModel.findOneAndUpdate(
			{ id },
			{
				totalReviews: newTotalReviews,
				averageRating: newAverageRating,
			},
			{ new: true }
		)
	})
}

export default {
	index,
	get,
	create,
	update,
	remove,
	findByUsername,
	updateStats,
}
