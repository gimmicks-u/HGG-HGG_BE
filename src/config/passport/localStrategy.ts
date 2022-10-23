import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { authDAO } from '../daos/authDao';
import { UserLogin } from '../../interfaces';

const Localstrategy = passportLocal.Strategy;
export const local = () => {
  console.log('Localstrategy 작동');
  passport.use(
    new Localstrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        const userDTO: UserLogin = { email, password };
        const user = await authDAO.selectUser(userDTO);
        if (user) {
          console.log('user 반환 받음 / done 작동');
          done(null, user);
        } else {
          done(null, false);
        }
      },
    ),
  );
};
