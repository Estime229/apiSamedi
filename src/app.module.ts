import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModel } from './auth/models/user.model/user.model';
import { PostModel } from './post/models/post.model/post.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import configuration from './config/configuration';
import { CommentModel } from './comment/models/comment.model/comment.model';
import { LikeModule } from './like/like.module';
import { LikeModel } from './like/models/like.model/like.model';
import { FollowModule } from './follow/follow.module';
import { FollowModel } from './follow/models/follow.model/follow.model';
import { GroupModule } from './group/group.module';
import { GroupModel } from './group/models/group.model/group.model';
import { MemberRequestModule } from './member-request/member-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Pour rendre le ConfigService disponible partout
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [
          UserModel,
          PostModel,
          CommentModel,
          LikeModel,
          FollowModel,
          GroupModel,
        ], // Spécifier explicitement les entités
        synchronize: configService.get('database.synchronize'),
        logging: configService.get('database.logging'),
        migrations: ['dist/migrations/*.js'], // Configuration des migrations
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    FollowModule,
    GroupModule,
    MemberRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
