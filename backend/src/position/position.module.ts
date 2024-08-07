import { Module } from '@nestjs/common';
import { PositionResolver } from './position.resolver';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { Department } from 'src/department/department.entity';
import { Employee } from 'src/employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Department, Employee])],
  providers: [PositionResolver, PositionService],
})
export class PositionModule {}
