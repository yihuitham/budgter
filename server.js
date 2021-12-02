//////dependencies//////
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
//////database//////
const budgets = require('./models/budget');

//////body parser//////
app.use(express.urlencoded());

//////routes//////
//index route
app.get('/budgets', (req, res) => {
  const balance = budgets.reduce((prev, cur) => prev + cur.amount, 0);
  res.render('index.ejs', { balance: balance, budgets: budgets });
});

//new route
app.get('/budgets/new', (req, res) => {
  res.render('new.ejs');
});

//show route
app.get('/budgets/:index', (req, res) => {
  const { index } = req.params;
  res.render('show.ejs', { budget: budgets[index] });
});

//create route
app.post('/budgets/new', (req, res) => {
  budgets.push(req.body);
  res.redirect('/budgets');
});

//////listener//////
app.listen(PORT, () => {
  console.log('Budget app listening on port ', PORT);
});
