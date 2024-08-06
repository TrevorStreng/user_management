import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmloyee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async getEmployee(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({ id });
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = this.employeeRepository.create(updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
