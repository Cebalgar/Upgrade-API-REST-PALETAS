const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

const User = require("../models/User");
const LocalStrategy = passportLocal.Strategy;


const saltRounds = 10;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
      
        const usuarioExistente = await User.findOne({ email: email });

       
        if (usuarioExistente) {
          const error = new Error('The user is already registered!');
          return done(error);
        }

        
        const passwordEncriptada = await bcrypt.hash(password, saltRounds);

       
        const newUser = new User({
          email: email,
          password: passwordEncriptada,
        });

        const savedUser = await newUser.save();
     
        done(null, savedUser);
      } catch (error) {
     
        return done(error);
      }
    }
  )
);