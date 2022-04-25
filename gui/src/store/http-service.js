import axios from 'axios'
import { urlBuilder } from '@/store/url-builder'

const getUrl = urlParts => {
  if ( Array.isArray(urlParts) ) {
    return urlParts.join('/')
  }
  return urlParts
}

export const restClient = async ( { method, url, payload, config } ) => {
  const restCallConfig = {
    method: method,
    url: urlBuilder(getUrl(url), payload),
    data: payload,
    config,
  }

  const { data } = await axios(restCallConfig)
  return data
}
