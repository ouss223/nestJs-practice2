import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [],
  exports: [],
})
export class SkillModule {}
