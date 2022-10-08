import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // table name in database
export class PostImage {
  @PrimaryGeneratedColumn() //auto generated id
  id: number;

  @Column({ length: 300 })
  image_url: string;
}
