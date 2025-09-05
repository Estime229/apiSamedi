import { Expose } from 'class-transformer';
import { UserModel } from '../../../auth/models/user.model/user.model';
import { PostModel } from '../../../post/models/post.model/post.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  content: string;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.comments)
  @JoinColumn()
  user: UserModel;

  @ManyToOne(() => PostModel, (post) => post.comments)
  @JoinColumn()
  post: PostModel;
}
