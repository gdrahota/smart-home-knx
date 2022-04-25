import mongoose, { Document, Model, Schema } from 'mongoose'

const { String, Mixed } = Schema.Types
export const collection = 'building-blocks'

export let buildingBlockSchema: Schema = new Schema({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	config: {
		type: Mixed,
		required: false,
	},
}, {
	minimize: true,
})

export let BuildingBlock: Model<Document> | null = null

export const registerBuildingBlockModel = () => {
	BuildingBlock = mongoose.model(collection, buildingBlockSchema)
}
