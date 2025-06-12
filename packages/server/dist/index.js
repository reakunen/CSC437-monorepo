import express from 'express'
import path from 'path'
import { connect } from './services/mongo.js'
import auth from './routes/auth.js'
// import Foods from './routes/foods.js';
// further down, near where you use the profiles router
const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
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

// Serve static files
app.use(express.static('public'))
app.use(
	'/styles',
	express.static(path.join(process.cwd(), '../../proto/public/styles'))
)

// Serve app files
app.use(express.static(path.join(process.cwd(), '../../app')))
app.use(express.static(path.join(process.cwd(), '../../proto/public')))

// Authentication routes
app.use('/auth', auth)

// Test route
app.get('/ping', (req, res) => {
	res.json({
		message: 'Server is running!',
		timestamp: new Date().toISOString(),
	})
})

// Serve login and register pages
app.get('/login.html', (req, res) => {
	res.sendFile(path.join(process.cwd(), '../../app/login.html'))
})

app.get('/register.html', (req, res) => {
	res.sendFile(path.join(process.cwd(), '../../app/register.html'))
})

// Serve main app
app.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd(), '../../app/index.html'))
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
	console.log(`🚀 Server running at http://localhost:${port}`)
	console.log(`🔑 Login at http://localhost:${port}/login.html`)
	console.log(`📝 Register at http://localhost:${port}/register.html`)
})
