'use strict'

const express = require('express')
const app = express()
const { json } = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const MONGODB_URL = 'mongodb://localhost:27017/todo'

app.use(express.static('client'))
app.use(json())


app.get('/', (req, res) => {
	res.json({ title: "Dave's mean todo"})
})

const Todo = mongoose.model('todo', {
	complete: Boolean,
	dueDate: String,
	task: String
}) 

app.get('/api/todo', (req, res, err) => {
	Todo
		.find()
		.then( todos => {
			console.log('todos', todos)	
			res.json({todos})
		})
		.catch(err)
})

mongoose.promise = Promise

mongoose.connect(MONGODB_URL, () => {
	app.listen(port, () => {
		console.log('now listening on  port', port)
	})
}) 