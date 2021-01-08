const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv');

dotenv.config();

const connection = require('./connection.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }))
app.use(bodyParser.json({ limit: '20mb' } ))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(cors())
app.set('trust proxy', 1)
app.use(morgan('dev'));
connection.start()
app.use(require('./routes/index'));

module.exports = app;