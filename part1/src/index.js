const logger = require('./structures/logger')
const insLogger = new logger(__dirname + '/logs')
const App = require('./structures/app')
let { log, debug, error } = insLogger
if(!process.env?.IS_ENV) {
    require('dotenv').config()
debug('Enabled dotenv')
}
log('Loading index.js')
let info = {
    title: 'about me',
    name: 'Saahil',
    description: ' is a dev'
}
// let questions = require('./questions.json')
let { app } = new App(insLogger)
app.get('/', (req,res) => {
    res.render('index', { info })
})
app.get('/date', (req,res) => {
    res.send(new Date)
})
insLogger.on('ready', () => log('ready'))
insLogger.on('debug', text => {
    debug(text)
})
