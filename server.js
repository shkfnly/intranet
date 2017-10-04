const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/test'
MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('Connected correctly to server.')
  db.close()
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`app listening on port ${app.get('port')}`)
})
