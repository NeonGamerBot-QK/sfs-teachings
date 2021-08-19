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
    this.app.listen(process.env.PORT)
}
}