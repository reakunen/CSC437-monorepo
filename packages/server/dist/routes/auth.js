import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import credentials from '../services/credential-svc.js';
const router = express.Router();
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'NOT_A_SECRET';
function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign({ username: username }, TOKEN_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error)
                reject(error);
            else
                resolve(token);
        });
    });
}
router.post('/register', (req, res) => {
    const { username, password } = req.body; // from form
    if (typeof username !== 'string' || typeof password !== 'string') {
        res.status(400).json({ error: 'Bad request: Invalid input data.' });
    }
    else {
        credentials
            .create(username, password)
            .then((creds) => generateAccessToken(creds.username))
            .then((token) => {
            res.status(201).json({ token: token });
        })
            .catch((err) => {
            console.error('Registration error:', err);
            res.status(409).json({ error: err.message || err });
        });
    }
});
router.post('/login', (req, res) => {
    const { username, password } = req.body; // from form
    if (!username || !password) {
        res.status(400).json({ error: 'Bad request: Invalid input data.' });
    }
    else {
        credentials
            .verify(username, password)
            .then((goodUser) => generateAccessToken(goodUser))
            .then((token) => res.status(200).json({ token: token }))
            .catch((error) => {
            console.error('Login error:', error);
            res.status(401).json({ error: 'Invalid username or password' });
        });
    }
});
export function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access token required' });
    }
    else {
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                // Add user info to request
                req.user = decoded;
                next();
            }
            else {
                console.error('Token verification error:', error);
                res.status(403).json({ error: 'Invalid or expired token' });
            }
        });
    }
}
// Route to verify token and get user info
router.get('/verify', authenticateUser, (req, res) => {
    res.json({ user: req.user });
});
export default router;
