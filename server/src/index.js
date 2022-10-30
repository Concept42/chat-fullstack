const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const messageRoute = require('./routes/messagesRoute')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('connected to the db'),
)

app.listen(process.env.PORT, () => console.log(`Server started on Port ${process.env.PORT}`))
