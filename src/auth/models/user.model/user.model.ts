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
import { FollowModel } from '../../../follow/models/follow.model/follow.model';
import { GroupModel } from '../../../group/models/group.model/group.model';
import { MemberModel } from '../../../member-request/models/member.model/member.model';

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
    unique: false,
  })
  username: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
    unique: false,
  })
  userUrl: string;

  // @Column({
  //   nullable: true,
  //   default: false,
  // })
  // isAct: boolean;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @OneToMany(() => PostModel, (post) => post.user, { onDelete: 'CASCADE' })
  posts: PostModel[];

  @OneToMany(() => LikeModel, (like) => like.user, { onDelete: 'CASCADE' })
  likes: LikeModel[];

  @OneToMany(() => CommentModel, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  comments: CommentModel[];

  @OneToMany(() => FollowModel, (follow) => follow.follower, {
    onDelete: 'CASCADE',
  })
  following: FollowModel[];

  @OneToMany(() => FollowModel, (follow) => follow.followed, {
    onDelete: 'CASCADE',
  })
  followers: FollowModel[];

  @OneToMany(() => GroupModel, (group) => group.user, { onDelete: 'CASCADE' })
  groups: GroupModel[];

  @OneToMany(() => MemberModel, (member) => member.user, {
    onDelete: 'CASCADE',
  })
  members: MemberModel[];
}
