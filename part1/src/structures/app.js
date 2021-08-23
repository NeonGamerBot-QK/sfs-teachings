module.exports = class App {
constructor(logger) {
    this.app = require('express')()
    this.logger = logger;
    this.app.on('mount', () => {
        this.logger.debug('App Mounted')
    })
    let app = this.app
    let express = require('express')
    app.set('view engine', 'ejs')
    app.use(require('express').json())
    app.use(express.static('public'))
    app.use((err,req,res,next) => {
        console.error(err)
        res.end('An error acourred ' + err)
    next()
    })
    this.listner = this.app.listen(process.env.PORT, () => {
        console.log('Listening on http://localhost:' + process.env.PORT)
    })
}
}