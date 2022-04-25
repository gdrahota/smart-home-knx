import mongoose, { Document, Model, Schema } from 'mongoose'

export const collection = 'tag-categories'

export const tagCategorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
}, {
	collection,
	minimize: true,
})

export let TagCategory: Model<Document> | null = null

export const registerTagCategoryModel = () => {
	TagCategory = mongoose.model(collection, tagCategorySchema)
}
