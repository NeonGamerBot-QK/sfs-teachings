const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
let config;
try {
    console.log('Trying to open config file')
    config = require('./config.json')
} catch (e) {
console.error('No config file found, using ENV')
require('dotenv').config()
}
require('./passport-setup');
app.use(cors())
app.use(require('express-session')({ secret: /'Keyboard cat'^/.toString(), cookie: { maxAge: 24 * 60 * 60 * 1000 }}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
// For an actual app you should configure this with an experation time, better keys, proxy and secure
// app.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
//   }))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.get('/', (req, res) => {
 // console.log(req.session, req.user)
  if(req.user) return res.json(req.user);
  res.send("Hi")
})
app.get('/discord', passport.authenticate('discord'));
app.get('/discord/callback', passport.authenticate('discord', {
    passReqToCallback: true,
    failureMessage: 'Failed to Connect to Discord',
 successFlash: true,
 failWithError: true,
}), function(req, res) {
    res.redirect('/') // Successful auth
});

app.get("/error", function(req, res) {
  res.send('An error has occurred')
})
app.get('/logout', function(req, res) {
  req.session.destroy()
  res.redirect('/')
})
app.set('json spaces', 1)

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))