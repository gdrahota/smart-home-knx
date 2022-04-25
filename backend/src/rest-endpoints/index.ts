import { Router } from "express"
import { knxGroupAddressRoutes } from "@/rest-endpoints/knx-addresses"
import { loginRoutes } from "@/rest-endpoints/login"
import { menuItemRoutes } from "@/rest-endpoints/menu-items"
import { buildingBlockRoutes } from "@/rest-endpoints/building-blocks"
import { tagCategoryRoutes } from "@/rest-endpoints/tag-categories"
import { tagRoutes } from "@/rest-endpoints/tag"

export const routes = Router()
	.use('/login', loginRoutes)
	.use('/knx-group-addresses', knxGroupAddressRoutes)
	.use('/menu-items', menuItemRoutes)
	.use('/tags', tagRoutes)
	.use('/tag-categories', tagCategoryRoutes)
	.use('/building-blocks', buildingBlockRoutes)
