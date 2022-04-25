import { Request, Response } from 'express'

export const errorHandler = ( req: Request, res: Response, err: any ) => {
  console.error( err )
  res.status( 500 ).send( err.message )
}
