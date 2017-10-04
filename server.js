const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/intranet'
MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('Connected correctly to server.')
  db.close()
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/login', (req, res) => {
  const address = req.query.address
  const pubKey = req.query.pubkey
  const fetchUser = (db, callback) => {
    let cursor = db.collection('people').findOne({'address': address}, (err, doc) => {
      assert.equal(null, err)
      if (doc !== null) {
        res.send(doc)
      } else {
        res.send({})
        callback()
      }
    })
  }
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    fetchUser(db, () => {
      db.close()
    })
  })
})

app.post('/api/register', (req, res) => {
  const registerUser = (db, callback) => {
    db.collection('people').insertOne({
      'address': req.body.address,
      'publicKey': req.body.publicKey
    }, (err, result) => {
      assert.equal(err, null)

      const objID = new ObjectId(result.insertedId)
      db.collection('people').findOne({'_id': objID}).then((user) => {
        res.send(user)
      })
      // doc.each((err, user) => {
      //   assert.equal(null, err)
      //   console.log(user)
      //   res.send(user)
      // })
      console.log('Inserted a document into the people collection.')
      callback()
    })
  }
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    registerUser(db, () => {
      db.close()
    })
  })
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`app listening on port ${app.get('port')}`)
})
