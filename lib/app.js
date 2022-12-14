const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/users', require('./controllers/users-controller'));
app.use('/api/v1/secrets', require('./controllers/secrets-controller'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
