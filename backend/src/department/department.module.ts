import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
