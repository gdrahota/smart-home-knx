import { Server } from 'socket.io'

interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: ( a: number, b: string, c: Buffer ) => void;
	withAck: ( d: string, callback: ( e: number ) => void ) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}

let conn: any
export let io: Server

const IP_PORT = process.env.IP_PORT || 8080

export const bindWebSocketToServer = async ( server: any ) => {
	return new Promise(( resolve, reject ) => {
		io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)

		io.on("connection", socket => {
			console.log('-> client has been connected', socket.id)
			socket.join("knx")
		})

		conn = server
			.listen(IP_PORT, ( err: any ) => {
					if ( err ) {
						console.log('=! Server does NOT listening!', err)
						reject(err)
					} else {
						console.log(`=> Server listens on port ${ IP_PORT } bind to ip address 0.0.0.0`)
						resolve(conn)
					}
				},
			)
	})
}

export const closeConnection = async () => conn.close()
