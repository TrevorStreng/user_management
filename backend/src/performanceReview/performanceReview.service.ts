import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceReviewDto } from './dto/performanceReview.dto';
import { PerformanceReview } from './performanceReview.entity';
import { error } from 'console';
import { Employee } from 'src/employees/employee.entity';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class PerformanceReviewService {
  constructor(
    @InjectRepository(PerformanceReview)
    private performanceReviewRepository: Repository<PerformanceReview>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async getPerformanceReviews(): Promise<PerformanceReview[]> {
    return await this.performanceReviewRepository.find();
  }

  async getPerformanceReview(id: number): Promise<PerformanceReview> {
    return await this.performanceReviewRepository.findOneBy({ id });
  }

  async createPerformanceReview(
    createPerformanceReviewDto: PerformanceReviewDto,
  ): Promise<PerformanceReview> {
    const { employee_id, admin_id, review_date, performance_score, comments } =
      createPerformanceReviewDto;

    const employee = await this.employeeRepository.findOneBy({
      id: employee_id,
    });
    if (!employee) throw new error(`No employee found.`);

    const admin = await this.adminRepository.findOneBy({ id: admin_id });
    if (!admin) throw new error(`No employee found.`);

    const performanceReview = this.performanceReviewRepository.create({
      employee,
      admin,
      review_date,
      performance_score,
      comments,
    });
    return await this.performanceReviewRepository.save(performanceReview);
  }

  async updatePerformanceReview(
    id: number,
    updatePerformanceReviewDto: PerformanceReviewDto,
  ): Promise<PerformanceReview> {
    await this.performanceReviewRepository.update(
      id,
      updatePerformanceReviewDto,
    );
    return await this.performanceReviewRepository.findOneBy({ id });
  }

  async deletePerformanceReview(id: number): Promise<Boolean> {
    await this.performanceReviewRepository.delete(id);
    return true;
  }
}
