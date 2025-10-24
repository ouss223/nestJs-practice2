import { Controller, Get, Post, Body, Param, Patch, Delete, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly svc: TodoService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Post()
  create(@Body() body: any, @Req() req: Request & { userId?: string }) {
    const userId = req.userId as string;
    return this.svc.create({ ...body, userId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req: Request & { userId?: string }) {
    // use updateByUser to ensure ownership check without conflicting base service signature
    return this.svc.updateByUser(parseInt(id, 10), req.userId as string, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { userId?: string }) {
    return this.svc.removeByUser(parseInt(id, 10), req.userId as string);
  }
}
