require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuff')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vxrbvet.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch((error) => console.log('Connexion à MongoDB échouée !'))


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
	next();
})

app.use(express.json())

app.use('/api/stuff', stuffRoutes)

module.exports = app