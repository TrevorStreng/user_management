import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataSource } from 'typeorm';
import { UserModule } from './users/users.module';
import { EmployeeModule } from './employees/employee.module';
import { User } from './users/user.entity';
import { Employee } from './employees/employee.entity';
import { Department } from './department/department.entity';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { AdminModule } from './admin/admin.module';
import { Position } from './position/position.entity';
import { Admin } from './admin/admin.entity';
import { Attendance } from './attendance/attendance.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { PayrollModule } from './payroll/payroll.module';
import { Payroll } from './payroll/payroll.entity';
import { PerformanceReviewModule } from './performanceReview/performanceReview.module';
import { PerformanceReview } from './performanceReview/performanceReview.entity';

@Module({
  imports: [
    UserModule,
    EmployeeModule,
    DepartmentModule,
    PositionModule,
    AdminModule,
    AttendanceModule,
    PayrollModule,
    PerformanceReviewModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      // playground: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hippysinthecity420!',
      database: 'human_resources',
      entities: [
        User,
        Employee,
        Department,
        Position,
        Admin,
        Attendance,
        Payroll,
        PerformanceReview,
      ],
      synchronize: false,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
