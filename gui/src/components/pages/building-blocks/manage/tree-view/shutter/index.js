export const shutterNodes = ( buildingBlock ) => ([
  {
    label: buildingBlock.name,
    link: 'config',
    addChild: {
      property: 'hangings',
      data: {
        name: 'neuer Behang',
        addresses: [
          { name: 'Reed-Kontakt', address: null, type: 'openCloseSensor', dtp: '1.009' },
          { name: 'Position mitlesen', address: null, type: 'positionListen', dtp: '5.001' },
          { name: 'Position anfahren', address: null, type: 'positionSet', dtp: '5.001' },
          { name: 'Hoch-/Runterfahren', address: null, type: 'upDownSet', dtp: '1.008' },
        ],
      },
    },
    children: buildingBlock.config.hangings.map(( hanging, hPos ) => {
      const { addresses, name } = hanging
      const link = `config.hangings.$${ hPos }`
      return {
        data: hanging,
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
