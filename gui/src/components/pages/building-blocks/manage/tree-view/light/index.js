export const lightNodes = ( buildingBlock ) => ([
  {
    label: buildingBlock.name,
    link: 'config',
    addChild: {
      property: 'channels',
      data: {
        name: 'neuer Kanal',
        addresses: [
          { name: 'Ein/Aus Schalten', address: null, type: 'setBinaryValue', dtp: '1.001' },
          { name: 'Ein/Aus Mitlesen', address: null, type: 'listenBinaryValue', dtp: '1.001' },
          { name: 'Wert setzen (0..100%)', address: null, type: 'setRelativeValue', dtp: '5.001' },
          { name: 'Wert mitlesen (0..100%)', address: null, type: 'listenRelativeValue', dtp: '5.001' },
          { name: 'Messwert in Lux', address: null, type: 'luminousFluxValue', dtp: '9.004' },
        ],
      },
    },
    children: buildingBlock.config.channels.map(( channel, hPos ) => {
      const { addresses, name } = channel
      const link = `config.channels.$${ hPos }`
      return {
        data: channel,
        label: name,
        deletable: true,
        link,
        editableProperties: [ { type: 'label', name: 'name', label: 'Bezeichnung' } ],
        children: addresses.map(( address, aPos ) => {
          return {
            label: address.name,
            data: address,
            link: `${ link }.addresses.$${ aPos }`,
            editableProperties: [
              { type: 'address', name: 'address', label: address.name },
            ],
          }
        }),
      }
    }),
  },
])
