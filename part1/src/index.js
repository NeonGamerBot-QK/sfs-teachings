
const App = require('./structures/app')
let { log, debug, error } = console
if(!process.env.IS_ENV) {
    require('dotenv').config()
debug('Enabled dotenv')
}
log('Loading index.js')
let info = {
    title: 'about me',
    name: 'Saahil',
    description: ' is a dev',
    tabs: [{ title: 'Info 1', description: '...info'.repeat(3) }, { title: 'Info 2', description: '...info'}]
}
// let questions = require('./questions.json')
let { app } = new App(console)
app.get('/', (req,res) => {
    res.render('index', { info, req,res })
})
app.get('/date', (req,res) => {
    res.send(new Date)
})
app.get('/info', (req,res) => {
    res.json(info.tabs)
})
