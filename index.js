require('dotenv').config()
const mongo = require('./utils/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const { Address } = require('./models/address')

const port = 3001
const addressUri = '/address'

app.use(cors())
app.use(express.json());

middleware.init(app)

if (process.env.NODE_ENV !== 'test') {
    mongo.init()
}

app.get(addressUri, (request, response) => {
    Address.find({})
        .then(notes => response.json(notes))
        .catch(() => response.status(500).end())
})

app.delete(addressUri, (request, response) => {
    if (!request.query || !request.query.id) {
        return response.status(400).json({ error: 'ID missing' })
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

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening port ${port}`)
    })
}

module.exports = app
