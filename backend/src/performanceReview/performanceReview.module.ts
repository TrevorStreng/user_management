import { Module } from '@nestjs/common';
import { PerformanceReviewResolver } from './performanceReview.resolver';
import { PerformanceReviewService } from './performanceReview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceReview } from './performanceReview.entity';
import { Admin } from 'src/admin/admin.entity';
import { Employee } from 'src/employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceReview, Admin, Employee])],
  providers: [PerformanceReviewResolver, PerformanceReviewService],
})
export class PerformanceReviewModule {}
