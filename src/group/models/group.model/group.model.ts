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
import { State } from '../../enums/state.type';
import { MemberModel } from '../../../member-request/models/member.model/member.model';

@Entity('group')
export class GroupModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    unique: true,
  })
  groupName: string;

  @Column({
    nullable: true,
    unique: true,
  })
  groupDesc: string;

  @Column({
    nullable: true,
    unique: true,
  })
  groupCategory: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: State,
    array: true,
  })
  groupState: State[];

  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.groups)
  @JoinColumn()
  user: UserModel;

  @OneToMany(() => MemberModel, (member) => member.group)
  members: MemberModel[];
}
