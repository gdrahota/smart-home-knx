export const urlBuilder = ( urlTemplate, properties ) => {
  const urlParts = urlTemplate.split('/')

  return urlParts.map(i => i.trim()).map(part => {
    return part.indexOf(':') === 0
      ? properties[ part.substr(1) ] || 'null'
      : part
  }).join('/')
}
