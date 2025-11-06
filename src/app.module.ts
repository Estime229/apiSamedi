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
import { MemberModel } from './member-request/models/member.model/member.model';
import { FileModule } from './file/file.module';
import { GeneratorModule } from './generator/generator.module';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
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

        // Configuration SSL optimisée pour Render
        ssl:
          process.env.NODE_ENV === 'production' ||
          process.env.RENDER ||
          process.env.DATABASE_URL
            ? {
                require: configService.get('ssl.require'),
                rejectUnauthorized: configService.get('ssl.rejectUnauthorized'),
              }
            : undefined,

        // NOUVEAU : Configuration pour gérer les cold starts
        retryAttempts: 15, // Plus de tentatives
        retryDelay: 5000, // 5 secondes entre chaque tentative
        connectTimeoutMS: 60000, // 60 secondes timeout

        // NOUVEAU : Pool de connexions optimisé
        extra: {
          max: 10, // Maximum 10 connexions
          min: 2, // Minimum 2 connexions
          idleTimeoutMillis: 30000, // 30 secondes avant de fermer une connexion inactive
          connectionTimeoutMillis: 60000, // 60 secondes pour établir une connexion
          statement_timeout: 60000, // 60 secondes timeout pour les requêtes
        },

        entities: [
          UserModel,
          PostModel,
          CommentModel,
          LikeModel,
          FollowModel,
          GroupModel,
          MemberModel,
        ],
        synchronize: configService.get('database.synchronize'),
        logging: configService.get('database.logging'),
        migrations: ['dist/migrations/*.js'],
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
    FileModule,
    GeneratorModule,
    MailModule,
    HealthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
