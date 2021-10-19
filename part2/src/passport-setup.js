const passport = require('passport');
const GoogleStrategy = require('passport-discord').Strategy;
let discord = JSON.parse(process.env.discord)
passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: discord.id,
    clientSecret: discord.secret,
    callbackURL: "http://localhost:3000/discord/callback",
    scope: ["identify", "email"]
  
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
//    profile.makeAvatarURL = ({ dynamic = false, format = null }) => {
//     if(!profile.avatar) return null; 
//     if(dynamic) {
// format = 'webp'       
//      }
//      if(
//        format && 
//       (format === 'webp' || format === 'png')
//       (format == 'png') ) {

//        }
// return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}${dynamic ? '' : `.${format}`}`;
//    } 
//    profile.makeBannerURL = ({ dynamic = false, format = null }) => {
//      if(!profile.banner) return null;
//     return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}${dynamic ? '' : `.${format}`}`;
   
   profile.refreshToken = refreshToken;
    return done(null, profile);
  }
));