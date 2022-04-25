import { toString } from "@/infrastructure/knx-client/to-string"

export let connection: any = null

export const connectToKnx = ( redisService: any ): Promise<any> => {
	const knx = require('advanced_knx').Connection

	const saveEventToDb = ( src: any, dest: any, value: any ) => {
		const groupAddress = toString(dest)
		redisService?.save(groupAddress, { src, groupAddress, value })
	}

	return new Promise(( resolve, reject ) => {
		const options = {
			debug: false,
			// ip address and port of the KNX router or interface
			ipAddr: '192.168.178.89',
			ipPort: 3671,
			physAddr: '1.0.201', // the KNX physical address we'd like to use
			loglevel: 'info', // set the log level for messages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.

			// do not automatically connect, but use connection.Connect() to establish connection
			//manualConnect: true,
			// use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
			forceTunneling: true,
			minimumDelay: 20, // wait at least 10 milliseconds between each datagram
			suppress_ack_ldatareq: false, // enable this option to suppress the acknowledgement flag with outgoing L_Data.req requests. LoxOne needs this
			manualConnect: true,
			//define your event handlers here:
			handlers: {
				// wait for connection establishment before sending anything!
				connected: () => {
					console.log('=> connected to knx')
					resolve(connection)
				},

				// get notified for all KNX events:
				// event: saveEventToDb,
				GroupValue_Response: saveEventToDb,
				GroupValue_Write: saveEventToDb,
				GroupValue_Read: saveEventToDb,
			},
			// get notified on connection errors
			err: ( connStatus: any ) => {
				console.log('| connection to knx FAILED!', connStatus)
				reject()
			}
		}

		console.log('| Connecting to knx interface...')
		connection = new knx(options).Connect()
	})
}
