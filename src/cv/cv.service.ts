import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Cv } from './cv.entity';
import { User } from '../user/user.entity';
import { Skill } from '../skill/skill.entity';
import { BaseService } from '../common/base.service';

@Injectable()
export class CvService extends BaseService<Cv> {
  constructor(
    @InjectRepository(Cv) repo: Repository<Cv>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
  ) {
    super(repo);
  }

  // Accept DTO-like shape with userId and skillIds and resolve relations
  async create(data: Partial<Cv> & { userId?: string; skillIds?: string[] }) {
    const payload: any = { ...data };

    if (data.userId) {
      const user = await this.userRepo.findOne({ where: { id: data.userId } });
      if (!user) throw new NotFoundException('User not found');
      payload.user = user;
    }

    if (data.skillIds && Array.isArray(data.skillIds) && data.skillIds.length) {
      const skills = await this.skillRepo.find({ where: { id: In(data.skillIds) } });
      payload.skills = skills;
    }

    return super.create(payload as Partial<Cv>);
  }

  async update(id: number, patch: Partial<Cv> & { userId?: string; skillIds?: string[] }) {
    const payload: any = { ...patch };

    if (patch.userId) {
      const user = await this.userRepo.findOne({ where: { id: patch.userId } });
      if (!user) throw new NotFoundException('User not found');
      payload.user = user;
    }

    if (patch.skillIds && Array.isArray(patch.skillIds)) {
      const skills = await this.skillRepo.find({ where: { id: In(patch.skillIds) } });
      payload.skills = skills;
    }

    return super.update(id, payload, ['skills', 'user']);
  }
}
