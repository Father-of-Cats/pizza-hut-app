const router = require('express').Router();

// Set up GET ALL and POST at /api/pizzas
router
    .route('/')
    .get()
    .post();

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
