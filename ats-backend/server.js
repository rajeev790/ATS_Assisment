const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(Server started on port ${PORT}));