import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import dotenv from "dotenv";
import User from '../model/userModel.js';

dotenv.config({ path: ".env" });

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
      done(null, user);
});

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        email:profile.email
      })
      if(!user){
        user = await User.create({
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          password: 'google',
        })
      }
      done(null, user);
    }
  )
);

// Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      // Pull in our app id and secret from our auth.js file
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_ID,
      callbackURL: 'http://localhost:3000/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'picture.type(large)',
        'email',
      ],
    },
    // Facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
