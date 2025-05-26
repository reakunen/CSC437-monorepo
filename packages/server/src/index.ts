import express, { Request, Response } from 'express'
import { connect } from './services/mongo'
import Foods from './services/food-svc'
import Reviewers from './services/reviewer-svc'

const app = express()
const port = process.env.PORT || 3000
const staticDir = process.env.STATIC || 'public'

connect('csc437') // use your own db name here

// Middleware
app.use(express.static(staticDir))
app.use(express.json())

// Routes

app.get('/hello', (req: Request, res: Response) => {
	res.send('Hello, World')
})

// Food routes
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

// Reviewer routes
app.get('/api/reviewers', (req: Request, res: Response) => {
	Reviewers.index()
		.then((reviewers) => res.json(reviewers))
		.catch((err) => res.status(500).json({ error: err.toString() }))
})

app.get('/api/reviewers/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Reviewers.get(id)
		.then((reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.get('/api/reviewers/username/:username', (req: Request, res: Response) => {
	const { username } = req.params
	Reviewers.findByUsername(username)
		.then((reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.post('/api/reviewers', (req: Request, res: Response) => {
	Reviewers.create(req.body)
		.then((reviewer) => res.status(201).json(reviewer))
		.catch((err) => res.status(400).json({ error: err.toString() }))
})

app.put('/api/reviewers/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Reviewers.update(id, req.body)
		.then((reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.delete('/api/reviewers/:id', (req: Request, res: Response) => {
	const { id } = req.params
	Reviewers.remove(id)
		.then(() => res.status(204).send())
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
