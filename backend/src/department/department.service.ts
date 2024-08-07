import { Injectable } from '@nestjs/common';
import { Department } from './department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getDepartments(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async getDepartment(id: number): Promise<Department> {
    return await this.departmentRepository.findOneBy({ id });
  }

  async createDepartment(
    createDepartmentDto: DepartmentDto,
  ): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }
  async updateDepartment(
    id: number,
    updateDepartmentDto: DepartmentDto,
  ): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return await this.departmentRepository.findOneBy({ id });
  }

  async deleteDepartment(id: number): Promise<void> {
    // ! this is probably going to require me to delete all positions in the department
    await this.departmentRepository.delete(id);
  }
}
