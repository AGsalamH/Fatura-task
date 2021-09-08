require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Models
const Role = require('./models/Role');

// Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

// Middlewares
const { urlNotFound, errorHandling  } = require('./middlewares/errorHandling');

// Instantiate express app
const app = express();

// App level Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * Router Middleware: Authentication router
*/
app.use('/api/auth', authRoutes);

/**
 * Router Middleware to test the Authorization
*/
 app.use('/api/users', usersRoutes);


/**
 * Error handling Middlewares
 */
app.use(urlNotFound); // 404
app.use(errorHandling);


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
