const mongoose = require('mongoose')

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
