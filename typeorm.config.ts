import { PostModel } from './src/post/models/post.model/post.model';
import { DataSource } from 'typeorm';
import { UserModel } from './src/auth/models/user.model/user.model';
import { CommentModel } from './src/comment/models/comment.model/comment.model';
import { LikeModel } from './src/like/models/like.model/like.model';
import { FollowModel } from './src/follow/models/follow.model/follow.model';
import { GroupModel } from './src/group/models/group.model/group.model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const config = yaml.load(
  fs.readFileSync('./src/config/default.yml', 'utf8'),
) as any;

export const AppDataSource = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  entities: [
    UserModel,
    PostModel,
    CommentModel,
    LikeModel,
    FollowModel,
    GroupModel,
  ],
  migrations: ['src/migrations/*.ts'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  ssl: true,
});
