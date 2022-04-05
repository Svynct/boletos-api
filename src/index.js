const express = require('express');
require('express-async-errors');

const errorHandler = require('./app/middlewares/errorHandler');
const cors = require('./app/middlewares/cors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(8080, () => console.log('Server started at http://localhost:8080'));
