const ADDRESS_TYPE = {
	PHYSICAL: 0x00,
	GROUP: 0x01,
}

export const toString = (
	buf: Buffer /*buffer*/,
	addressType: any = ADDRESS_TYPE.GROUP /*ADDRESS_TYPE*/,
	twoLevelAddressing: boolean = false /*boolean*/
) => {
	const Parser = require('binary-parser').Parser

	const threeLevelPhysical = new Parser().bit4('l1').bit4('l2').uint8('l3')
	const threeLevelGroup = new Parser().bit5('l1').bit3('l2').uint8('l3')
	const twoLevel = new Parser().bit5('l1').bit11('l2')

	const group = addressType == ADDRESS_TYPE.GROUP

	if ( !Buffer.isBuffer(buf) || buf.length !== 2 ) {
		throw new Error('not a buffer, or not a 2-byte address buffer')
	}

	// 2 level group
	if ( group && twoLevelAddressing ) {
		const { l1, l2 } = twoLevel.parse(buf)
		return [l1, l2].join('/')
	}

	// 3 level physical or group address
	const sep = group ? '/' : '.'
	const parser = group ? threeLevelGroup : threeLevelPhysical
	const { l1, l2, l3 } = parser.parse(buf)
	return [l1, l2, l3].join(sep)
}
