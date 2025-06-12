import express from 'express';
import Foods from '../services/food-svc';
const router = express.Router();
// GET /api/foods (Collection)
router.get('/', (_, res) => {
    Foods.index()
        .then((list) => res.json(list))
        .catch((err) => res.status(500).json({ error: err.toString() }));
});
// GET /api/foods/:id (Resource)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Foods.get(id)
        .then((food) => res.json(food))
        .catch((err) => res.status(404).json({ error: err.toString() }));
});
// POST /api/foods (Create)
router.post('/', (req, res) => {
    const newFood = req.body;
    Foods.create(newFood)
        .then((food) => res.status(201).json(food))
        .catch((err) => res.status(400).json({ error: err.toString() }));
});
// PUT /api/foods/:id (Update)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedFood = req.body;
    Foods.update(id, updatedFood)
        .then((food) => res.json(food))
        .catch((err) => res.status(404).json({ error: err.toString() }));
});
// DELETE /api/foods/:id (Remove)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Foods.remove(id)
        .then(() => res.status(204).send())
        .catch((err) => res.status(404).json({ error: err.toString() }));
});
export default router;
