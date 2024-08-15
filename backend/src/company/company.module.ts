import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admin/admin.entity';
import { AdminService } from 'src/admin/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User, Admin])],
  providers: [CompanyResolver, CompanyService, AdminService],
})
export class CompanyModule {}
