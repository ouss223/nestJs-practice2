import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async create(data: Partial<Todo>) {
    const t = this.repo.create(data);
    return this.repo.save(t);
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, userId: string, patch: Partial<Todo>) {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not owner');
    Object.assign(todo, patch);
    return this.repo.save(todo);
  }

  async remove(id: number, userId: string) {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not owner');
    return this.repo.remove(todo);
  }
}
