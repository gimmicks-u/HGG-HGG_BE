import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PostStatus } from './common/Enums';
import { PostImage } from './post_image';
import { User } from './user';

@Entity() // table name in database
export class Post {
  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: PostStatus })
  status: PostStatus;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  meeting_date: Date | undefined;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | undefined;

  @ManyToOne(() => User, (user) => user.post, { onDelete: 'CASCADE' })
  @JoinColumn([{ referencedColumnName: 'id', name: 'user_id' }])
  user: User;

  @OneToMany(() => PostImage, (post_image) => post_image.image_url)
  image_url: PostImage[];
}
