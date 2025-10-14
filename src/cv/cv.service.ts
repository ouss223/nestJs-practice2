import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './cv.entity';

@Injectable()
export class CvService {
  constructor(@InjectRepository(Cv) private repo: Repository<Cv>) {}

  create(data: Partial<Cv>) {
    return this.repo.save(this.repo.create(data));
  }

  findAll() {
    return this.repo.find({ relations: ['skills', 'user'] });
  }

  async findOne(id: number) {
    const cv = await this.repo.findOne({ where: { id }, relations: ['skills', 'user'] });
    if (!cv) throw new NotFoundException('CV not found');
    return cv;
  }

  async update(id: number, patch: Partial<Cv>) {
    const cv = await this.findOne(id);
    Object.assign(cv, patch);
    return this.repo.save(cv);
  }

  async remove(id: number) {
    const cv = await this.findOne(id);
    return this.repo.remove(cv);
  }
}
