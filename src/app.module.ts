import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { FormsModule } from './forms/forms.module';
import {AnswersModule} from "./answers/answers.module";
import {NotificationsModule} from "./notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(
    ),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UsersModule,
      NotificationsModule,
    FormsModule,
    AnswersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ormconfig.json
// {
//   "type": "postgres",
//   "url": "process.env.DATABASE_URL",
//   "entities": [
//     "dist/**/*.entity{.ts,.js}"
//   ],
//   "autoLoadEntities": true,
//   "synchronize": true,
//   "ssl": true,
//   "extra": {
//     "ssl": {
//       "rejectUnauthorized": false
//     }
//   }
// }