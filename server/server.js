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
			res.json({todos})
		})
		.catch(err)
})

app.post('/api/todo', (req, res, err) => {
	Todo
		.create(req.body)
		.then( job => res.json(job))
		.catch(err)
})

app.delete('/api/todo/:id', (req, res, err) => {
	console.log('_id', req.params.id)
	Todo
		.remove({_id: req.params.id})
		.then( response => res.json(response))
		.catch(err)
})

app.patch('/api/todo/', ({body: {_id, complete}}, res, err) => {
	console.log('req.body.comlete', _id, complete)
	res.send('got patch request')
	Todo
		.update({ _id }, {complete: !complete})
		.then( response => res.json(response))
		.catch(err)
})

mongoose.Promise = Promise

mongoose.connect(MONGODB_URL, () => {
	app.listen(port, () => {
		console.log('now listening on  port', port)
	})
}) 