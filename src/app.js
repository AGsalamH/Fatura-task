require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');


const app = express();

// App level configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(result => {
    console.log('MongoDB connected successfully ...');
}).catch(err => {
    console.log(err);
    process.exit();
});

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});