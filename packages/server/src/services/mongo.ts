// src/services/mongo.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'

mongoose.set('debug', true)
dotenv.config()

function getMongoURI(dbname: string) {
	let connection_string = `mongodb://localhost:27017/${dbname}`
	const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env

	if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
		console.log(
			'Connecting to MongoDB at',
			`mongodb+srv://${MONGO_USER}:*****@${MONGO_CLUSTER}/${dbname}`
		)
		connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority&appName=CSC437`
	} else {
		console.log('Connecting to MongoDB at ', connection_string)
	}
	return connection_string
}

export function connect(dbname: string) {
	mongoose
		.connect(getMongoURI(dbname))
		.then(() => {
			console.log('✅ Successfully connected to MongoDB!')
		})
		.catch((error) => {
			console.error('❌ Failed to connect to MongoDB:')
			if (error.message.includes('IP')) {
				console.error('🔒 IP Address not whitelisted in MongoDB Atlas.')
				console.error(
					'   Please add your current IP address to the Atlas whitelist.'
				)
				console.error('   Visit: https://cloud.mongodb.com -> Network Access')
			} else if (error.message.includes('authentication')) {
				console.error(
					'🔑 Authentication failed. Check your username and password.'
				)
			} else {
				console.error('Error details:', error.message)
			}
		})
}
