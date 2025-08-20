import { Expose } from 'class-transformer';
import { UserModel } from '../../../auth/models/user.model/user.model';
import { PostModel } from '../../../post/models/post.model/post.model';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('likes')
export class LikeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: false,
  })
  isLiked: boolean;

  @ManyToOne(() => UserModel, (user) => user.likes)
  @JoinColumn()
  user: UserModel;

  @ManyToOne(() => PostModel, (post) => post.likes)
  @JoinColumn()
  post: PostModel;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;
}
