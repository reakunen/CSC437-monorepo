import express, { Request, Response } from 'express'
import { connect } from './services/mongo'

import auth, { authenticateUser } from './routes/auth'
import Foods from './routes/foods'

// further down, near where you use the profiles router
const app = express()
const port = process.env.PORT || 3000

connect('csc437') // use your own db name here

// Middleware
const staticDir = process.env.STATIC || 'public'
app.use(express.static(staticDir))
app.use(express.json())

// auth route
app.use('/auth', auth)

// api route
app.use('/api/foods', authenticateUser, Foods)
// app.use('/', authenticateUser)

app.get('/ping', (_: Request, res: Response) => {
	res.send(
		`<h1>Hello!</h1>
	   <p>Server is up and running.</p>
	   <p>Serving static files from <code>${staticDir}</code>.</p>
	  `
	)
})



// Food routes
/*
import Foods from './services/food-svc'
app.get('/api/foods', (req: Request, res: Response) => {
	Foods.index()
		.then((foods) => res.json(foods))
		.catch((err) => res.status(500).json({ error: err.toString() }))
})

app.get('/api/foods/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Foods.get(id)
		.then((food) => res.json(food))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.post('/api/foods', (req: Request, res: Response) => {
	Foods.create(req.body)
		.then((food) => res.status(201).json(food))
		.catch((err) => res.status(400).json({ error: err.toString() }))
})

app.put('/api/foods/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Foods.update(id, req.body)
		.then((food) => res.json(food))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.delete('/api/foods/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Foods.remove(id)
		.then(() => res.status(204).send())
		.catch((err) => res.status(404).json({ error: err.toString() }))
})
*/

app.use('/auth', auth)

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
