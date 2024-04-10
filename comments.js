// Create web server
// Create a web server
// Import express
const express = require('express');
const app = express();
// Import body-parser
const bodyParser = require('body-parser');
// Import mongoose
const mongoose = require('mongoose');
// Import Comment model
const Comment = require('./models/Comment');
// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');
// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Create a comment
app.post('/api/comments', (req, res) => {
  const { comment } = req.body;
  Comment.create({ comment }, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(comment);
    }
  });
});
// Get all comments
app.get('/api/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comments);
    }
  });
});
// Get a comment
app.get('/api/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});
// Update a comment
app.put('/api/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});
// Delete a comment
app.delete('/api/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});
// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
// Run server with node comments.js
// Open Postman
// Create a