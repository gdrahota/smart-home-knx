export const registerNumberFilter = ( Vue ) => {
  Vue.filter('number', ( value, numberOfFractionDigits = 2 ) => {
    const options = {}

    options.minimumFractionDigits = numberOfFractionDigits
    options.maximumFractionDigits = numberOfFractionDigits

    if ( value || value === 0 ) {
      return new Intl.NumberFormat('de-DE', options).format(value)
    }
  })
}
