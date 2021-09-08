require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const Role = require('./models/Role');

// Instantiate express app
const app = express();

// App level configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * Router Middleware
 * Router - /api/auth/*
 * Method - POST
 */
app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(result => {
    console.log('MongoDB connected successfully ...');
    Role.initializeRoles(); // creates ['user', 'admin', 'moderator'] roles
}).catch(err => {
    console.log(err);
    process.exit();
});

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
