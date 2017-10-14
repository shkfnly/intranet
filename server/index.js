const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

app.use(express.static(path.resolve(__dirname, '../frontend/build')))

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/intranet'
// MongoClient.connect(url, (err, db) => {
//   assert.equal(null, err)
//   console.log('Connected correctly to server.')
//   db.close()
// })

app.get('/api/profile', (req, res) => {
  const address = req.query.address
  const fetchProfile = (db, callback) => {
    db.collection('people').findOne({'address': address}, (err, doc) => {
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
    fetchProfile(db, () => {
      db.close()
    })
  })
})

app.get('/api/profiles', (req, res) => {
  const fetchProfiles = (db, callback) => {
    db.collection('people').find().toArray((err, docs) => {
      assert.equal(null, err)
      res.send(docs)
      callback()
    })
  }
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    fetchProfiles(db, () => {
      db.close()
    })
  })
})

app.get('/api/login', (req, res) => {
  const address = req.query.address
  const pubKey = req.query.pubkey
  const fetchUser = (db, callback) => {
    db.collection('people').findOne({'address': address}, (err, doc) => {
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
app.post('/api/save', (req, res) => {
  const address = req.query.address
  const saveProfile = (db, callback) => {
    db.collection('people').findOneAndUpdate({'address': address}, {$set: req.body}, { returnOriginal: false }, (err, doc) => {
      assert.equal(null, err)
      console.log(doc.value)
      res.send(doc.value)
      callback()
    })
  }
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)
    saveProfile(db, () => {
      db.close()
    })
  })
})
app.post('/api/register', (req, res) => {
  const registerUser = (db, callback) => {
    db.collection('people').insertOne(
      // 'address': req.body.address,
      // 'publicKey': req.body.publicKey
      req.body
    , (err, result) => {
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
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
})
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`app listening on port ${app.get('port')}`)
})
