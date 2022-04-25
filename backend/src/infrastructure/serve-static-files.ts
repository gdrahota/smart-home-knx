import path from 'path'
import { NextFunction, Request, Response } from "express"

export const serveStaticFiles = ( app: any ) => {
	app.use('/*', ( a: Request, b: Response, next: NextFunction ) => {
		console.log('local', __dirname, path.join(__dirname + '../../../gui/dist/'))
		next()
	})

	app.use('/socket.io/*', ( req: Request, res: Response ) => {
		res.status(202)
	})
}
