import { Expose } from 'class-transformer';
import { PostModel } from '../../../post/models/post.model/post.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentModel } from '../../../comment/models/comment.model/comment.model';
import { LikeModel } from '../../../like/models/like.model/like.model';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @OneToMany(() => PostModel, (post) => post.user)
  posts: PostModel[];

  @OneToMany(() => LikeModel, (like) => like.user)
  likes: LikeModel[];

  @OneToMany(() => CommentModel, (comment) => comment.user)
  comments: CommentModel[];
}
