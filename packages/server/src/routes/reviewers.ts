import express, { Request, Response } from 'express'
import { Reviewer } from '../models/reviewer'
import Reviewers from '../services/reviewer-svc'

const router = express.Router()

// GET /api/reviewers (Collection)
router.get('/', (_, res: Response) => {
	Reviewers.index()
		.then((list: Reviewer[]) => res.json(list))
		.catch((err) => res.status(500).json({ error: err.toString() }))
})

// GET /api/reviewers/:id (Resource)
router.get('/:id', (req: Request, res: Response) => {
	const { id } = req.params

	Reviewers.get(id)
		.then((reviewer: Reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

// GET /api/reviewers/username/:username (Special endpoint)
router.get('/username/:username', (req: Request, res: Response) => {
	const { username } = req.params

	Reviewers.findByUsername(username)
		.then((reviewer: Reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

// POST /api/reviewers (Create)
router.post('/', (req: Request, res: Response) => {
	const newReviewer = req.body

	Reviewers.create(newReviewer)
		.then((reviewer: Reviewer) => res.status(201).json(reviewer))
		.catch((err) => res.status(400).json({ error: err.toString() }))
})

// PUT /api/reviewers/:id (Update)
router.put('/:id', (req: Request, res: Response) => {
	const { id } = req.params
	const updatedReviewer = req.body

	Reviewers.update(id, updatedReviewer)
		.then((reviewer: Reviewer) => res.json(reviewer))
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

// DELETE /api/reviewers/:id (Remove)
router.delete('/:id', (req: Request, res: Response) => {
	const { id } = req.params

	Reviewers.remove(id)
		.then(() => res.status(204).send())
		.catch((err) => res.status(404).json({ error: err.toString() }))
})

export default router
