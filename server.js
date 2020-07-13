const express = require('express')
const app = express()

const mongoose = require('mongoose')

// ---Initiate Middleware---
app.use(express.json())

// ---Connect To Database---
const db = 'mongodb+srv://bdg1994:bdg1994@thoughts-xcomj.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect( db, { useUnifiedTopology: true,  useNewUrlParser: true }, (err) => {
    if (err) throw err
    console.log('Database Successfully Connected ...')
} )

// ---Use Routes---
app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/thought', require('./routes/thought'))

// ---Listen To Server---
app.listen(7000, () => console.log('Server ready at port 7000 ...'))