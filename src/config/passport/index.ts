import * as passport from 'passport';
import { local } from './localStrategy';

export const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  local();
};
