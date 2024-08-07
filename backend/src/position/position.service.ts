import { Injectable } from '@nestjs/common';
import { Position } from './position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionDto } from './dto/position.dto';
import { Department } from 'src/department/department.entity';
import { error } from 'console';
import { Employee } from 'src/employees/employee.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,

    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getPositions(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async getPosition(id: number): Promise<Position> {
    return await this.positionRepository.findOneBy({ id });
  }

  async createPosition(createPositionDto: PositionDto): Promise<Position> {
    const { department_id, position_title } = createPositionDto;

    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department) throw new error(`No department found..`);

    const position = this.positionRepository.create({
      position_title,
      department,
    });
    return await this.positionRepository.save(position);
  }

  async updatePosition(
    id: number,
    updatePositionDto: PositionDto,
  ): Promise<Position> {
    // ! Might need to do something here if updating department idk
    await this.positionRepository.update(id, updatePositionDto);
    return await this.positionRepository.findOneBy({ id });
  }

  async deletePosition(id: number): Promise<void> {
    await this.positionRepository.delete(id);
  }
}
