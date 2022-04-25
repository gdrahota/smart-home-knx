import { HttpMethod } from '@/store/enums/http-method'

const baseUrl = '/api'

const baseUrlMenus = `${ baseUrl }/menu-items`

const baseUrlKnxGroupAddress = `${ baseUrl }/knx-group-addresses`
const baseUrlKnxGroupAddressDefs = `${ baseUrlKnxGroupAddress }/defs`
const baseUrlKnxGroupAddressValues = `${ baseUrlKnxGroupAddress }/values`
const baseUrlTags = `${ baseUrl }/tags`
const baseUrlTagCategories = `${ baseUrl }/tag-categories`
const baseUrlBuildingBlocks = `${ baseUrl }/building-blocks`

export const action = async ( actionName, payload, params ) => {
  const config = { payload }

  switch ( actionName ) {
    /* tagCategories */
    case 'tagCategories.getAll': {
      config.url = baseUrlTagCategories
      config.method = HttpMethod.GET
      break
    }
    case 'tagCategories.getById': {
      config.url = `${ baseUrlTagCategories }/${ params._id }`
      config.method = HttpMethod.GET
      break
    }
    case 'tagCategories.create': {
      config.url = baseUrlTagCategories
      config.method = HttpMethod.POST
      config.payload = payload
      break
    }
    case 'tagCategories.update': {
      config.url = `${ baseUrlTagCategories }/${ params._id }`
      config.method = HttpMethod.PUT
      config.payload = payload
      break
    }
    case 'tagCategories.delete': {
      config.url = `${ baseUrlTagCategories }/${ params._id }`
      config.method = HttpMethod.DELETE
      break
    }
    /* tagCategories */

    /* tags */
    case 'tags.getAll': {
      config.url = baseUrlTags
      config.method = HttpMethod.GET
      break
    }
    case 'tags.getById': {
      config.url = `${ baseUrlTags }/${ params._id }`
      config.method = HttpMethod.GET
      break
    }
    case 'tags.create': {
      config.url = baseUrlTags
      config.method = HttpMethod.POST
      config.payload = payload
      break
    }
    case 'tags.update': {
      config.url = `${ baseUrlTags }/${ params._id }`
      config.method = HttpMethod.PUT
      config.payload = payload
      break
    }
    case 'tags.delete': {
      config.url = `${ baseUrlTags }/${ params._id }`
      config.method = HttpMethod.DELETE
      break
    }
    case 'tags.removeBuildingBlock': {
      config.url = `${ baseUrlTags }/${ params.tagId }/building-blocks/${ params.buildingBlockId }`
      config.method = HttpMethod.DELETE
      break
    }
    case 'tags.addBuildingBlock': {
      config.url = `${ baseUrlTags }/${ params.tagId }/building-blocks/${ params.buildingBlockId }`
      config.method = HttpMethod.POST
      break
    }
    /* tags */

    /* buildingBlocks */
    case 'buildingBlocks.getAll': {
      config.url = baseUrlBuildingBlocks
      config.method = HttpMethod.GET
      break
    }
    case 'buildingBlocks.getById': {
      config.url = `${ baseUrlBuildingBlocks }/${ params._id }`
      config.method = HttpMethod.GET
      break
    }
    case 'buildingBlocks.create': {
      config.url = baseUrlBuildingBlocks
      config.method = HttpMethod.POST
      config.payload = payload
      break
    }
    case 'buildingBlocks.update': {
      config.url = `${ baseUrlBuildingBlocks }/${ params._id }`
      config.method = HttpMethod.PUT
      config.payload = payload
      break
    }
    case 'buildingBlocks.delete': {
      config.url = `${ baseUrlBuildingBlocks }/${ params._id }`
      config.method = HttpMethod.DELETE
      break
    }
    /* buildingBlocks */

    case 'knxGroupAddressDefs.getAll': {
      config.url = baseUrlKnxGroupAddressDefs
      config.method = HttpMethod.GET
      break
    }
    case 'knxGroupAddressDefs.getById': {
      config.url = `${ baseUrlKnxGroupAddressDefs }/${ params._id }`
      config.method = HttpMethod.GET
      break
    }
    case 'knxGroupAddressDefs.create': {
      config.url = baseUrlKnxGroupAddressDefs
      config.method = HttpMethod.POST
      config.payload = payload
      break
    }
    case 'knxGroupAddressDefs.update': {
      config.url = `${ baseUrlKnxGroupAddressDefs }/${ params._id }`
      config.method = HttpMethod.PUT
      config.payload = payload
      break
    }
    case 'knxGroupAddressDefs.delete': {
      config.url = `${ baseUrlKnxGroupAddressDefs }/${ params._id }`
      config.method = HttpMethod.DELETE
      break
    }

    case 'knxGroupAddressValues.getAll': {
      config.url = baseUrlKnxGroupAddressValues
      config.method = HttpMethod.GET
      break
    }
    case 'knxGroupAddressValues.getById': {
      config.url = `${ baseUrlKnxGroupAddressValues }/${ params._id }`
      config.method = HttpMethod.GET
      break
    }
    case 'knxGroupAddressValues.propagate': {
      config.url = `${ baseUrlKnxGroupAddressValues }/${ params._id }/propagate`
      config.method = HttpMethod.POST
      config.payload = payload
      break
    }
    case 'knxGroupAddressValues.readFromKnxBus': {
      config.url = `${ baseUrlKnxGroupAddressValues }/${ params._id }/read-group-address-value`
      config.method = HttpMethod.GET
      break
    }

    // +++ menuItems +++
    case 'menuItems.getAll':
      config.url = baseUrlMenus
      config.method = HttpMethod.GET
      break

    case 'menuItems.add':
      config.url = baseUrlMenus
      config.method = HttpMethod.POST
      break

    case 'menuItems.update':
      config.url = `${ baseUrlMenus }/${ payload._id }`
      config.method = HttpMethod.PUT
      break

    case 'menuItems.delete':
      config.url = `${ baseUrlMenus }/${ payload }`
      config.method = HttpMethod.DELETE
      break
    // --- menuItems ---
    default:
      console.error('ERROR', 'action type unknown: ', actionName)
      throw new Error(`action type unknown: ${ actionName }`)
  }

  const { restClient } = await import('@/store/http-service')
  return restClient(config)
}
