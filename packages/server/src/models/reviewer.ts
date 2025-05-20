export interface Reviewer {
	id: string
	username: string
	name: string
	email: string
	bio?: string
	profileImage?: string
	joinDate: Date
	totalReviews: number
	averageRating: number
	favoriteCuisines: string[]
	location: string
	isVerified: boolean
}
