import Vue from 'vue'

export const sortByTitle = ( a, b ) => a.title.localeCompare(b.title)
export const sortByAddress = ( a, b ) => a.address.localeCompare(b.address)
export const sortByUpdatedAt = ( a, b ) => b.updatedAt.localeCompare(a.updatedAt)
export const sortByLabel = ( a, b ) => a.label.localeCompare(b.label)
export const sortByName = ( a, b ) => {
  if ( a == null || b == null || a.name == null || b.name == null ) {
    return 0
  }
  return a.name.localeCompare(b.name)
}

export const sortByValue = ( a, b ) => {
  if ( a.value === b.value ) {
    return 0
  } else if ( a.value > b.value ) {
    return 1
  }
  return -1
}

export const sortByFieldSorter = ( field, reverse, dataTye ) => {
  let keyFc

  switch ( dataTye ) {
    case Date:
      keyFc = x => x && x[ field ] ? Vue.moment(x[ field ]).format('X') : 0
      break
    case String:
      keyFc = x => x && x[ field ] ? x[ field ].toString().toLowerCase() : ''
      break
    case Number:
    default:
      keyFc = x => x && x[ field ] ? parseFloat(x[ field ]) : 0
      break
  }

  reverse = reverse ? -1 : 1

  return ( a, b ) => {
    a = a ? keyFc(a) : 0
    b = b ? keyFc(b) : 0

    return reverse * ((a > b) - (b > a))
  }
}
