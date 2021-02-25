const mongoose = require('mongoose')

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

module.exports = {
    Address
}
