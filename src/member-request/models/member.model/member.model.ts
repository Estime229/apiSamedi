import { Expose } from 'class-transformer';
import { RequestState } from '../../enums/requestState.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../../../auth/models/user.model/user.model';
import { GroupModel } from '../../../group/models/group.model/group.model';

@Entity('member')
export class MemberModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @Column({
    nullable: true,
    unique: true,
  })
  message: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: RequestState,
    array: true,
  })
  requestState: RequestState[];

  @ManyToOne(() => UserModel, (user) => user.members)
  @JoinColumn()
  user: UserModel;

  @ManyToOne(() => GroupModel, (group) => group.members)
  @JoinColumn()
  group: GroupModel;
}
