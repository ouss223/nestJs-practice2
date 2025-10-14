import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';
import { AuthMiddleware } from './common/auth.middleware';
import { CvModule } from './cv/cv.module';
import { Cv } from './cv/cv.entity';
import { User } from './user/user.entity';
import { Skill } from './skill/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'database.sqlite'),
      entities: [Todo, Cv, User, Skill],
      synchronize: true,
    }),
    TodoModule,
    CvModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}
