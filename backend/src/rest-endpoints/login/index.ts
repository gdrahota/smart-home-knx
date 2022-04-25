import { Request, Response, Router } from 'express'
import { provideToken } from './provide-jwt'
import { errorHandler } from '../error-handler'

const getToken = async ( user: IUser ): Promise<string> => {
	return provideToken(user)
}

export interface IUser {
	id: number
	accountName: string
	email: string
	firstName: string
	lastName: string
	authorities?: string[]
}

const signIn = async ( req: Request, res: Response ) => {
	try {
		const user: IUser = {
			id: 1234567890,
			email: 'guido@drahota.de',
			firstName: 'Guido',
			lastName: 'Drahota',
			accountName: 'guidodrahota',
			authorities: []
		}

		const token = await getToken({ ...(user as unknown as IUser) })

		res.setHeader('X-Auth-Token', token)
		res.send()
	} catch ( err ) {
		errorHandler(req, res, err)
	}

	// 	try {
	// 		const { username, password } = request.body
	//
	// 		const adminBinding = new LdapAuth('technical-ldap-user-1', 'here-goes-the-password')
	//
	// 		try {
	// 			const user = await adminBinding.findUserByAccountName(username)
	//
	// 			const ldapAuth = new LdapAuth(user.userPrincipalName, password)
	// 			const signedIn = await ldapAuth.authenticate()
	//
	// 			if ( signedIn ) {
	// 				const userGroups = await ldapAuth.getUserGroups(user)
	// 				const token = await getToken({ ...user, userGroups })
	//
	// 				response.setHeader('X-Auth-Token', token)
	// 				response.send()
	// 			} else {
	// 				response.status(404)
	// 			}
	// 		} catch ( e ) {
	// 			console.error('ERROR', e)
	// 		}
	// 	} catch ( err ) {
	// 		response.status(500)
	// 		console.error('ERROR in Sign In User Endpoint', err)
	// 	}
}

export const loginRoutes = Router().post('/', signIn)
