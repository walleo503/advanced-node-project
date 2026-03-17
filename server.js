'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

fccTesting(app);
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'pug');
app.set('views', './views/pug');


app.route('/').get((req, res) => {
  res.render('index');
});

myDB(async (client) => {
  const myDataBase = await client.db('database').collection('users');
}).catch((e) => {
  console.log('DB Error: ' + e);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});