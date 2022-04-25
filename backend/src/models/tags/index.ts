import mongoose, { Document, Model, Schema } from 'mongoose'

const { String, ObjectId } = Schema.Types

export const collection = 'tags'

export const tagSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	categoryId: {
		type: ObjectId
	},
	description: {
		type: String,
		required: false,
	},
	buildingBlocks: {
		type: [String],
		default: () => ([]),
	}
}, {
	collection,
	minimize: true,
})

export let Tag: Model<Document> | null = null

export const registerTagModel = () => {
	Tag = mongoose.model(collection, tagSchema)
}
