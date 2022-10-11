import { Request, Response } from 'express';
import { PostsService } from '../services/posts.service';
import { PostID, PostCreate } from '../interfaces/index';

export const PostsController = {
  requestPost: async (req: Request, res: Response) => {
    const id = Number(req.path.replace('/', ''));

    const postDTO: PostID = { id };

    const result = await PostsService.getPost(postDTO);
    const { status, PostedContent } = result;

    res.status(status).json(PostedContent);
  },

  createPost: async (req: Request, res: Response) => {
    const { title, content, user_id } = req.body;

    const postDTO: PostCreate = { title, content, user_id };
    const result = await PostsService.createPost(postDTO);
    const { status, message } = result;
    res.status(status).json(message);
  },
};
