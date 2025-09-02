import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../../../auth/models/user.model/user.model';
import { Expose } from 'class-transformer';

@Entity('follow')
export class FollowModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: false,
  })
  isFollow: boolean;

  @ManyToOne(() => UserModel, (user) => user.following)
  @JoinColumn({ name: 'followerId' })
  follower: UserModel;

  @ManyToOne(() => UserModel, (user) => user.followers)
  @JoinColumn({ name: 'followedId' })
  followed: UserModel;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;
}
