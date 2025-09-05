import { Expose } from 'class-transformer';
import { UserModel } from '../../../auth/models/user.model/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentModel } from '../../../comment/models/comment.model/comment.model';
import { LikeModel } from '../../../like/models/like.model/like.model';

@Entity('posts')
export class PostModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  body: string;

  @Column({
    nullable: true,
  })
  postUrl: string;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.posts)
  @JoinColumn()
  user: UserModel;

  @OneToMany(() => CommentModel, (comment) => comment.post)
  comments: CommentModel[];

  @OneToMany(() => LikeModel, (like) => like.post)
  likes: LikeModel[];
}
