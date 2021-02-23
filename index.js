const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./middleware')

const port = 3001

app.use(cors())
app.use(express.json());

middleware.init(app)

const addressUri = '/address'

const mongoUri = YOUR_MONGODB_URI

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const addressSchema = new mongoose.Schema({
    name: String,
    address: String,
    developer: Boolean,
})

addressSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Address = mongoose.model('Address', addressSchema)

app.get(addressUri, (request, response) => {
    Address.find({})
        .then(notes => response.json(notes))
        .catch(() => response.status(500).end())
})

app.delete(addressUri, (request, response) => {
    if (!request.query || !request.query.id) {
        return response.status(400).json({ error: 'name ID' })
    }

    Address.findByIdAndRemove(request.query.id)
        .then(() => response.status(204).end())
        .catch(() => response.status(400).end())
})

app.post(addressUri, (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    }

    const address = new Address({
        name: body.name,
        address: body.address,
        developer: body.developer
    })

    address.save()
        .then(() => response.json(JSON.stringify(address)))
        .catch(() => response.status(500).end())
})

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})