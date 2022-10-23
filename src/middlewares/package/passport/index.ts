import * as passport from 'passport';
import { passportConfig } from '../../../config/passport/index';

console.log('PassportConfig 작동');
passportConfig();

export const Passport = passport;
