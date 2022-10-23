import { User } from '../db/entity/user';
import {
  UserCreate,
  UserDelete,
  UserUpdate,
  UserEmail,
  UserNickName,
} from '../interfaces';
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
      return { message: '회원정보를 요청받지 못했습니다.', status: 400 };
    }
  },

  readUser: async (userId: number) => {
    const foundUser = await getRepository(User).findOne({
      where: { id: userId, deleted_at: null },
    });

    if (!foundUser) {
      return { message: '회원정보를 요청받지 못했습니다.', status: 400 };
    }

    const { password, deleted_at, ...resultUserData } = foundUser;
    return { ...resultUserData, status: 200 };
  },

  updateUser: async (userDTO: UserUpdate) => {
    let changedPassword: string;
    // 비밀번호 해쉬
    if (userDTO.password) {
      changedPassword = userDTO.password;
      const hashedPassword = await bcrypt.hash(userDTO.password, 12);
      userDTO.password = hashedPassword;
    }
    // const result = await getRepository(User)
    //   .createQueryBuilder()
    //   .update(User)
    //   .set(userDTO)
    //   .where('id = :id', { id: 1 })
    //   .execute();
    // console.log(result); // affected 가 항상 1로 나오는 issue

    const userDTOProperties: string[] = Object.keys(userDTO);

    const user: User = await getRepository(User).findOne({
      where: { id: 1, deleted_at: null }, /// 나중에 꼭 수정 !!!
    });
    const beforeQuery = {};
    userDTOProperties.forEach((item) => (beforeQuery[item] = user[item]));
    console.log(beforeQuery);

    // nickname
    user.nickname = userDTO.nickname ? userDTO.nickname : user.nickname;

    //password
    user.password = userDTO.password;

    //profile_image
    user.profile_image = userDTO.profile_image
      ? userDTO.profile_image
      : user.profile_image;

    const saveUser: User = await getRepository(User).save(user);
    const afterQuery = {};
    userDTOProperties.forEach((item) => (afterQuery[item] = saveUser[item]));
    console.log(afterQuery);

    // affected rows 구하기
    let affectedRows = 0;
    for (const key of userDTOProperties) {
      if (key === 'password') {
        bcrypt.compareSync(changedPassword, beforeQuery[key]) || affectedRows++;
        // 바뀐 비밀번호가 이전에 설정되어있던 비밀번호와 다르면 false -> affectedRows++
      } else {
        beforeQuery[key] !== afterQuery[key] && affectedRows++;
      }
    }
    const result = affectedRows
      ? { message: '회원정보가 수정되었습니다.', status: 200 }
      : { message: '입력하신 정보를 확인해주세요.', status: 400 };

    return result;
  },

  deleteUser: async (userDTO: UserDelete) => {
    // 비밀번호 검증
    const userInDbById: User = await getRepository(User).findOne({
      where: { id: userDTO.id, deleted_at: null },
    });

    if (!userInDbById) {
      return { message: '해당 회원이 존재하지 않습니다.', status: 404 };
    }
    const isMatchedPassword: boolean = await bcrypt.compare(
      userDTO.password,
      userInDbById.password,
    );

    if (!isMatchedPassword) {
      return { message: '입력하신 비밀번호를 확인해주세요.', status: 400 };
    }

    // 탈퇴
    const deleteUser = await getRepository(User)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id: userDTO.id })
      .execute();
    return { message: '회원 탈퇴되었습니다.', status: 200 };
  },

  //이메일 중복확인
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

  //닉네임 중복확인
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
