const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOSTNAME}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
let dbConnection;

async function connect() {
	try {
		if (dbConnection) return dbConnection;
		await client.connect();
		dbConnection = client.db(process.env.DBNAME);
		console.log('Connected to MongoDB');
		return dbConnection;
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw new Error('Failed to connect to MongoDB');
	}
}
// Cerrar la conexión al finalizar la aplicación
process.on('SIGINT', async () => {
	try {
		console.log('Closing MongoDB connection');
		await client.close();
		console.log('MongoDB connection closed');
		process.exit(0);
	} catch (error) {
		console.error('Error closing MongoDB connection:', error);
		process.exit(1);
	}
});

module.exports = { connect };