import { PostModel } from './src/post/models/post.model/post.model';
import { DataSource } from 'typeorm';
import { UserModel } from './src/auth/models/user.model/user.model';
import { CommentModel } from './src/comment/models/comment.model/comment.model';
import { LikeModel } from './src/like/models/like.model/like.model';
import { FollowModel } from './src/follow/models/follow.model/follow.model';
import { GroupModel } from './src/group/models/group.model/group.model';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'api_user',
  password: 'api_password',
  database: 'api_db',
  synchronize: false,
  logging: true,
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
});
