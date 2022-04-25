const jwt = require('jsonwebtoken')

export const provideToken = ( user: any ) => {
	return jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 72),
			user,
		},
		'oi7654ewsdcvhgfde4567ujhgfcvbnmjktre'
	)
}
