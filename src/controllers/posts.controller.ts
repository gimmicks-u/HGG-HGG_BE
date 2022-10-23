import { Request, Response } from 'express';
import { PostsService } from '../services/posts.service';
import {
  PostID,
  PostCreate,
  PostUpdate,
  PostDelete,
} from '../interfaces/index';

export const PostsController = {
  requestPost: async (req: Request, res: Response) => {
    const postId = Number(req.params.id);

    const postDTO: PostID = { postId };
    const result = await PostsService.requestPost(postDTO);

    const { status, PostedContent } = result;

    res.status(status).json(PostedContent);
  },

  createPost: async (req: Request, res: Response) => {
    const userId = 10; // authentication으로 대체
    const { title, content, groupStatus, meetingDate } = req.body;

    const postDTO: PostCreate = {
      title,
      content,
      groupStatus,
      meetingDate,
      userId,
    };
    const result = await PostsService.createPost(postDTO);

    const { status, message } = result;

    res.status(status).json(message);
  },
  updatePost: async (req: Request, res: Response) => {
    const userId = 10; // authentication으로 대체
    const postId = Number(req.params.id);
    const { title, content, groupStatus, meetingDate } = req.body;

    const postDTO: PostUpdate = {
      postId,
      title,
      content,
      groupStatus,
      meetingDate,
      userId,
    };

    const result = await PostsService.updatePost(postDTO);

    const { status, message } = result;

    res.status(status).json(message);
  },

  deletePost: async (req: Request, res: Response) => {
    const userId = 10; // authentication으로 대체
    const postId = Number(req.params.id);

    const postDTO: PostDelete = {
      postId,
      userId,
    };
    const result = await PostsService.deletePost(postDTO);

    const { status, message } = result;

    res.status(status).json(message);
  },
};
