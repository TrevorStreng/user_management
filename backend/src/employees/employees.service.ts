import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmloyee.dto';
import { Position } from 'src/position/position.entity';
import { Department } from 'src/department/department.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Position)
    private positionRepository: Repository<Position>,

    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployee(id: number): Promise<Employee> {
    const user = await this.employeeRepository.findOneBy({ id });
    console.log(user);
    return user;
  }

  async createEmployee(
    id: number,
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const department = await this.departmentRepository.findOneBy({
      id: createEmployeeDto.department_id,
    });
    const position = await this.positionRepository.findOneBy({
      id: createEmployeeDto.position_id,
    });

    const {
      first_name,
      last_name,
      date_of_birth,
      address,
      phone_number,
      date_hired,
      salary,
    } = createEmployeeDto;

    const employee = this.employeeRepository.create({
      id,
      first_name,
      last_name,
      date_of_birth,
      address,
      phone_number,
      date_hired,
      salary,
      department,
      position,
    });
    return await this.employeeRepository.save(employee);
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    this.employeeRepository.update(id, updateEmployeeDto);
    return await this.employeeRepository.findOneBy({ id });
  }

  async deleteEmployee(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
