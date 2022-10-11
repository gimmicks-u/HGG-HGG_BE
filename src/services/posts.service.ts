import { Post } from '../db/entity/post';
import { User } from '../db/entity/user';
import { PostCreate, PostID } from '../interfaces';
import { getRepository } from 'typeorm';

export const PostsService = {
  getPost: async (postDTO: PostID) => {
    const getPost = await getRepository(Post).findOneBy({
      id: postDTO.id,
    });
    if (!getPost)
      return {
        status: 400,
        PostedContent: '해당 Post가 존재하지 않습니다.',
      };

    return {
      status: 200,
      PostedContent: getPost,
    };
  },

  createPost: async (postDTO: PostCreate) => {
    try {
      const getPost = getRepository(Post).create(postDTO);

      const user_id = await getRepository(User).findOneBy({
        id: postDTO.user_id,
      });
      if (!user_id) {
        return {
          status: 400,
          message: '존재하지 않는 사용자입니다. 로그인을 확인해주십시오',
        };
      }

      const post = new Post();
      post.title = getPost.title;
      post.content = getPost.content;
      post.user = user_id;

      await getRepository(Post).save(post);

      return { status: 200, message: '글이 작성되었습니다!' };
    } catch (err) {
      console.log(err);
      return { status: 400, message: 'post가 저장되지 못했습니다.' };
    }
  },
};
