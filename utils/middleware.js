/** Logger middleware is used to print requests to terminal for debugging purposes
 * @module middleware
*/
const logger = (request, response, next) => {
    console.log(`${request.method} ${request.path}`)
    console.log('Body:', request.body)
    console.log('')
    next()
}

const init = (app) => {
    if (process.env.NODE_ENV !== 'test') {
        // Avoid logging in unittests because it messes up output
        app.use(logger);
    }
}

module.exports = {
    init
}
