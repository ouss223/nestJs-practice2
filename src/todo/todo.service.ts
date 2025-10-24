import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { BaseService } from '../common/base.service';

@Injectable()
export class TodoService extends BaseService<Todo> {
  constructor(@InjectRepository(Todo) repo: Repository<Todo>) {
    super(repo);
  }

  // Create attaches the userId from controller; base create is fine
  async create(data: Partial<Todo>) {
    return super.create(data);
  }

  // Override update/remove to check ownership
  async updateByUser(id: number, userId: string, patch: Partial<Todo>) {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    if (String(todo.userId) !== String(userId)) throw new ForbiddenException('Not owner');
    Object.assign(todo, patch);
    return this.repo.save(todo);
  }

  async removeByUser(id: number, userId: string) {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    if (String(todo.userId) !== String(userId)) throw new ForbiddenException('Not owner');
    return this.repo.remove(todo);
  }
}
