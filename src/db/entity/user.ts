import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post';

@Entity() // table name in database
export class User {
  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  kakao_id: string;

  @Column({ nullable: true })
  provider: string | undefined;

  @Column({ nullable: true })
  profile_image: string | undefined;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | undefined;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
}
