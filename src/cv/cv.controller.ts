import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './create-cv.dto';
import { UpdateCvDto } from './update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private svc: CvService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateCvDto) {
    return this.svc.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCvDto) {
    return this.svc.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}
