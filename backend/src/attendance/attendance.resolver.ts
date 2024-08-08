import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Attendance } from './attendance.entity';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceService } from './attendance.service';

@Resolver((of: any) => Attendance)
export class AttendanceResolver {
  constructor(private attendanceService: AttendanceService) {}

  @Query((returns) => [Attendance], { name: 'Attendances' })
  async getAttendances() {
    return await this.attendanceService.getAttendances();
  }

  @Query((returns) => Attendance, { name: 'Attendance' })
  async getAttendance(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Attendance> {
    return await this.attendanceService.getAttendance(id);
  }

  @Mutation(() => Attendance, { name: 'createAttendance' })
  async createAttendance(
    @Args('createAttendanceInput') createAttendanceDto: AttendanceDto,
  ): Promise<Attendance> {
    return await this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Mutation(() => Attendance, { name: 'updateAttendance' })
  async updateAttendance(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAttendanceInput') updateAttendanceDto: AttendanceDto,
  ): Promise<Attendance> {
    return await this.attendanceService.updateAttendance(
      id,
      updateAttendanceDto,
    );
  }

  @Mutation(() => Boolean)
  async deleteAttendance(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.attendanceService.deleteAttendance(id);
    return true;
  }
}
