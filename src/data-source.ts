import { DataSource } from 'typeorm';
import { UserModel } from './auth/models/user.model/user.model';
import { PostModel } from './post/models/post.model/post.model';
import { CommentModel } from './comment/models/comment.model/comment.model';
import { LikeModel } from './like/models/like.model/like.model';
import { FollowModel } from './follow/models/follow.model/follow.model';
import { GroupModel } from './group/models/group.model/group.model';
import { MemberModel } from './member-request/models/member.model/member.model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const hasDatabaseUrl = !!process.env.DATABASE_URL;

let config: any = {};
try {
  // Fallback to YAML when DATABASE_URL is not provided
  if (!hasDatabaseUrl) {
    const raw = fs.readFileSync('./src/config/default.yml', 'utf8');
    config = yaml.load(raw) as any;
  }
} catch {
  // Ignore if file not present in some environments
}

const AppDataSource = new DataSource(
  hasDatabaseUrl
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL as string,
        ssl:
          process.env.NODE_ENV === 'production' || process.env.RENDER
            ? { rejectUnauthorized: false }
            : undefined,
        entities: [
          UserModel,
          PostModel,
          CommentModel,
          LikeModel,
          FollowModel,
          GroupModel,
          MemberModel,
        ],
        migrations: ['dist/migrations/*.js'],
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }
    : {
        type: (config.database?.type as 'postgres') ?? 'postgres',
        host: config.database?.host,
        port: config.database?.port,
        username: config.database?.username,
        password: config.database?.password,
        database: config.database?.database,
        ssl:
          config.database?.host === 'localhost' ||
          config.database?.host === '127.0.0.1'
            ? false
            : config.ssl && config.ssl.require
              ? { rejectUnauthorized: config.ssl.rejectUnauthorized ?? false }
              : undefined,
        entities: [
          UserModel,
          PostModel,
          CommentModel,
          LikeModel,
          FollowModel,
          GroupModel,
          MemberModel,
        ],
        migrations: ['dist/migrations/*.js'],
        migrationsRun: false,
        migrationsTableName: 'migrations',
      },
);
export default AppDataSource;
