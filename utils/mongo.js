const mongoose = require('mongoose')

/** Initialization routine for MongoDB connection
 * @module mongo
*/
const init = () => {
    mongoose.connect(process.env.MONGO_URI, {
        seNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

module.exports = {
    init
}
