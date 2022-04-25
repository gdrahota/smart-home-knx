import { registerKnxGroupAddressModel } from "@/models/knx-group-address"
import { registerMenuItemModel } from "@/models/menu-item"
import { registerTagCategoryModel } from "@/models/tag-category"
import { registerBuildingBlockModel } from "@/models/building-block"
import { registerTagModel } from "@/models/tags"

export const registerModels = () => {
	registerMenuItemModel()
	registerBuildingBlockModel()
	registerKnxGroupAddressModel()
	registerTagCategoryModel()
	registerTagModel()
}
