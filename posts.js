const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new post
router.post('/', (req, res) => {
    const { title, content, image_url, video_url, meta_title, meta_description, tags, status } = req.body;
    const sql = 'INSERT INTO posts (title, content, image_url, video_url, meta_title, meta_description, tags, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, content, image_url, video_url, meta_title, meta_description, tags, status], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Get all posts
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get a single post
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Update a post
router.put('/:id', (req, res) => {
    const { title, content, image_url, video_url, meta_title, meta_description, tags, status } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ?, image_url = ?, video_url = ?, meta_title = ?, meta_description = ?, tags = ?, status = ? WHERE id = ?';
    db.query(sql, [title, content, image_url, video_url, meta_title, meta_description, tags, status, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Post updated' });
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Post deleted' });
    });
});

module.exports = router;
