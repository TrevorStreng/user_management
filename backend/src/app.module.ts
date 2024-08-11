import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'src/config.env', isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      // playground: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
    UserModule,
    EmployeeModule,
    DepartmentModule,
    PositionModule,
    AdminModule,
    AttendanceModule,
    PayrollModule,
    PerformanceReviewModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
