console.log('hello');

const MongoClient = require('mongodb').MongoClient;



let db;

MongoClient.connect('mongodb://dysphemic:chicken@ds121696.mlab.com:21696/star-wars-quotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})



app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err,result) => {
    if (err) return console.log(err)

    console.log('saved to the db you dummy')
    res.redirect('/')
  })
})


// set up embedded javascript



