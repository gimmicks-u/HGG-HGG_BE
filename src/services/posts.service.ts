import { Post } from '../db/entity/post';
import { User } from '../db/entity/user';
import { PostID, PostCreate, PostUpdate, PostDelete } from '../interfaces';
import { getRepository } from 'typeorm';
import { PostStatus } from '../db/entity/common/Enums';

export const PostsService = {
  requestPost: async (postDTO: PostID) => {
    const requestPost = await getRepository(Post).findOne({
      where: {
        id: postDTO.postId,
        deleted_at: null,
      },
    });
    if (!requestPost)
      return {
        status: 400,
        PostedContent: '해당 글이 존재하지 않습니다.',
      };

    return {
      status: 200,
      PostedContent: requestPost,
    };
  },

  createPost: async (postDTO: PostCreate) => {
    try {
      const createPost = getRepository(Post).create(postDTO);

      // authentication으로 전환될것
      const user_id = await getRepository(User).findOne({
        where: {
          id: postDTO.userId,
        },
      });
      if (!user_id) {
        return {
          status: 400,
          message: '존재하지 않는 사용자입니다. 로그인을 확인해주십시오',
        };
      }
      // authentication으로 전환될것

      const post = new Post();
      post.title = createPost.title;
      post.content = createPost.content;
      post.meeting_date = new Date(createPost.meeting_date);
      post.user = user_id;

      console.log(post);

      await getRepository(Post).save(post);

      return { status: 200, message: '글이 작성되었습니다!' };
    } catch (err) {
      console.log(err);
      return { status: 400, message: '글이 저장되지 못했습니다.' };
    }
  },

  updatePost: async (postDTO: PostUpdate) => {
    try {
      // authentication으로 전환될것
      const user_id = await getRepository(User).findOne({
        where: {
          id: postDTO.userId,
        },
      });
      if (!user_id) {
        return {
          status: 400,
          message: '존재하지 않는 사용자입니다. 로그인을 확인해주십시오',
        };
      }
      // authentication으로 전환될것

      const updatePost = await getRepository(Post).findOne({
        where: {
          id: postDTO.postId,
          deleted_at: null,
        },
        relations: {
          user: true,
        },
      });

      if (user_id.id != updatePost.user.id) {
        return { status: 400, message: '해당 글의 수정권한이 없습니다.' };
      }

      updatePost.title = postDTO.title;
      updatePost.content = postDTO.content;
      updatePost.status = PostStatus[postDTO.groupStatus];
      updatePost.meeting_date = new Date(postDTO.meetingDate);

      await getRepository(Post).save(updatePost);

      return { status: 200, message: '글이 수정되었습니다!' };
    } catch (err) {
      console.log(err);
      return { status: 400, message: '글을 수정하지 못했습니다.' };
    }
  },

  deletePost: async (postDTO: PostDelete) => {
    try {
      // authentication으로 전환될것
      const user_id = await getRepository(User).findOne({
        where: {
          id: postDTO.userId,
        },
      });
      if (!user_id) {
        return {
          status: 400,
          message: '존재하지 않는 사용자입니다. 로그인을 확인해주십시오',
        };
      }
      // authentication으로 전환될것

      const deletePost = await getRepository(Post).findOne({
        where: {
          id: postDTO.postId, //postId
          deleted_at: null,
        },
        relations: {
          user: true,
        },
      });

      if (user_id.id != deletePost.user.id) {
        return { status: 400, message: '해당 글의 삭제권한이 없습니다.' };
      }

      const deleteDate = new Date(Date()); //new Date().toLocaleString('ko-kr');

      deletePost.deleted_at = deleteDate;

      console.log(`${deletePost.created_at}  /  ${deletePost.updated_at}`);

      await getRepository(Post).save(deletePost);

      return { status: 200, message: '글이 삭제되었습니다!' };
    } catch (err) {
      console.log(err);
      return { status: 400, message: '글을 삭제하지 못했습니다.' };
    }
  },
};
