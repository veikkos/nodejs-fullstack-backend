const logger = (request, response, next) => {
    console.log(`${request.method} ${request.path}`)
    console.log('Body:', request.body)
    console.log('')
    next()
}

const init = (app) => {
    app.use(logger);
}

module.exports = {
    init
}
