import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post';

@Entity() // table name in database
export class PostImage {
  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column({ length: 300 })
  image_url: string;

  @ManyToOne(() => Post, (post) => post.image_url, { onDelete: 'CASCADE' })
  @JoinColumn([{ referencedColumnName: 'id', name: 'post_id' }])
  post: Post;
}
