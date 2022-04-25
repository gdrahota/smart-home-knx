import { Router } from 'express'
import { knxGroupAddressDefRoutes } from "@/rest-endpoints/knx-addresses/defs"
import { knxGroupAddressValuesRoutes } from "@/rest-endpoints/knx-addresses/values"

export const knxGroupAddressRoutes = Router()
	.use('/defs', knxGroupAddressDefRoutes)
	.use('/values', knxGroupAddressValuesRoutes)
