
const App = require('./structures/app')
let { log, debug, error } = console
if(!process.env.IS_ENV) {
    require('dotenv').config()
debug('Enabled dotenv')
}
log('Loading index.js')
let path = 'C:/Users/attud/Documents/Github/sfs-teachings/part1/public/data.json'
let info = require(path)
setInterval(() => {
   delete require.cache[path]
}, 9000)
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
//