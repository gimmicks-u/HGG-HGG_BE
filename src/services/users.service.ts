import { User } from '../db/entity/user';
import { UserCreate, UserEmail, UserNickName } from '../interfaces';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const UsersService = {
  createUser: async (userDTO: UserCreate) => {
    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(userDTO.password, 12);
    userDTO.password = hashedPassword;

    // 이메일 중복확인
    const hasEmail = await getRepository(User).findOneBy({
      email: userDTO.email,
    });

    if (hasEmail) {
      return { message: '중복된 이메일입니다.', status: 400 };
    }

    // 닉네임 중복확인
    const hasNickname = await getRepository(User).findOneBy({
      nickname: userDTO.nickname,
    });
    if (hasNickname) {
      return { message: '중복된 닉네임입니다.', status: 400 };
    }

    // 저장
    try {
      const user = getRepository(User).create(userDTO);
      await getRepository(User).save(user);
      // 회원가입 성공
      return {
        message: '회원가입이 완료되었습니다.',
        status: 201,
      };
    } catch (err) {
      console.log(err);
      return { message: '입력하신 정보를 확인해주세요.', status: 400 };
    }
  },
  checkEmail: async (userDTO: UserEmail) => {
    const hasEmail = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: `${userDTO.email}` })
      .getOne();

    const request_res = {
      useAble: {
        message: '사용가능한 이메일입니다. 테스트 테스트',
        status: 201,
      },
      useUnable: {
        message: '중복된 이메일입니다. 테스트 테스트',
        status: 400,
      },
    };
    return hasEmail == null ? request_res.useAble : request_res.useUnable;
  },

  checkNickname: async (userDTO: UserNickName) => {
    const hasEmail = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname: `${userDTO.nickname}` })
      .getOne();

    const request_res = {
      useAble: {
        message: '사용가능한 닉네임입니다. 테스트 테스트',
        status: 201,
      },
      useUnable: {
        message: '중복된 닉네임입니다. 테스트 테스트',
        status: 400,
      },
    };
    return hasEmail == null ? request_res.useAble : request_res.useUnable;
  },
};
