import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

passport.use(
  new LocalStrategy((username, password, done) => {
    return done(null, { fakeUser: 'fake', id: 1 });
  })
);

export default passport;
