require('dotenv').config()

const db = require('./db')
const app = require('./app.js')

const port = process.env.PORT || 3000
db().then(info => {
	console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
	app.listen(port, () => {
		console.log("Server listening on port: " + port)
	})
}).catch(() => {
	console.error('Unable to connect to database :(')
})