import { Injectable } from '@nestjs/common';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceDto } from './dto/Attendance.dto';
import { Employee } from 'src/employees/employee.entity';
import { error } from 'console';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getAttendances(): Promise<Attendance[]> {
    return await this.attendanceRepository.find();
  }

  async getAttendance(id: number): Promise<Attendance> {
    return await this.attendanceRepository.findOneBy({ id });
  }

  async createAttendance(
    createAttendanceDto: AttendanceDto,
  ): Promise<Attendance> {
    const { date, employee_id, check_in_time, check_out_time, status } =
      createAttendanceDto;

    const employee = await this.employeeRepository.findOneBy({
      id: employee_id,
    });

    if (!employee) throw new error(`No employee found..`);

    const attendance = this.attendanceRepository.create({
      date,
      check_in_time,
      check_out_time,
      status,
      employee,
    });
    return await this.attendanceRepository.save(attendance);
  }

  async updateAttendance(
    id: number,
    updateAttendanceDto: AttendanceDto,
  ): Promise<Attendance> {
    await this.attendanceRepository.update(id, updateAttendanceDto);
    return await this.attendanceRepository.findOneBy({ id });
  }

  async deleteAttendance(id: number): Promise<void> {
    await this.attendanceRepository.delete(id);
  }
}
