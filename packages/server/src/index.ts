import express, { Request, Response } from 'express'
import path from 'path'
import { connect } from './services/mongo'

import auth, { authenticateUser } from './routes/auth'
import Foods from './routes/foods'

// further down, near where you use the profiles router
const app = express()
const port = process.env.PORT || 3000

connect('csc437') // use your own db name here

// Middleware
app.use(express.json())

// CORS for development
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	if (req.method === 'OPTIONS') {
		res.sendStatus(200)
	} else {
		next()
	}
})

// Serve static files from multiple directories
const staticDir = process.env.STATIC || 'public'
app.use(express.static(staticDir))

// Serve app files
app.use(express.static(path.join(__dirname, '../../app')))
app.use(express.static(path.join(__dirname, '../../proto/public')))

// auth route
app.use('/auth', auth)

// api route
app.use('/api/foods', authenticateUser, Foods)

// Serve login and register pages
app.get('/login.html', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../app/login.html'))
})

app.get('/register.html', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../app/register.html'))
})

// Serve main app for all other routes
app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../app/index.html'))
})

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

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
	console.log(`Login at http://localhost:${port}/login.html`)
	console.log(`Register at http://localhost:${port}/register.html`)
})
