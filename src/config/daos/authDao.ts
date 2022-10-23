import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../../db/entity/user';
import { UserLogin } from '../../interfaces';

export const authDAO = {
  selectUser: async (userDTO: UserLogin) => {
    console.log('authDAO selectUser 시작');
    const userParams = await getRepository(User).findOneBy({
      email: userDTO.email,
      provider: 'local',
    });
    const passwordCompare = await bcrypt.compare(
      userDTO.password,
      userParams.password,
    );
    if (passwordCompare) {
      console.log('authDAO userParams 반환');
      console.log(userParams);
      console.log(`passwordCompare 결과 : ${passwordCompare}`);
      return userParams;
    }
    return null;
  },
};
