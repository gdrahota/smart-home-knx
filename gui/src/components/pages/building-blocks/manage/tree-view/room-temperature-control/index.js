export const rtcNodes = ( buildingBlock ) => ([
  {
    label: buildingBlock.name,
    link: 'config',
    children: buildingBlock.config.addresses.map(( address, hPos ) => {
      const { name } = address
      const link = `config.addresses.$${ hPos }`
      return {
        data: address,
        label: name,
        link,
        editableProperties: [
          { type: 'address', name: 'address', label: address.name },
        ],
      }
    }),
  },
])
