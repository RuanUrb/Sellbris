import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../domain/entities/User/User';

export default (passport: PassportStatic) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'surpriseyoufoundaneasteregg.ordidyou?',
  },
  async (payload, done) => {
    try{
      const user = await User.findById(payload.id).exec()
      if(user) return done(null, user)
      return done(null, false)
    }catch(e){
      return done({e}, false)
    }
  }));
};