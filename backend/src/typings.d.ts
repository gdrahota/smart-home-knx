export interface KnxGroupAddress {
	_id?: string
	address: string
	dataPointType: string
	description?: string
}

export interface NewTagCategory {
	name: string
	description?: string
}

export interface TagCategory extends NewTagCategory {
	_id: string
}

export interface NewTag {
	name: string
	categoryId: string
	description?: string
	buildingBlocks?: string[]
}

export interface Tag extends NewTag {
	_id: string
}

export interface BuildingBlock {
	_id: string
	type: string
	name: string
	description?: string
	config: any
}
