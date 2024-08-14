import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async getCompany(id: number): Promise<Company> {
    return await this.companyRepository.findOneBy({ id });
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    return await this.companyRepository.findOneBy({ id });
  }

  async deleteCompany(id: number): Promise<boolean> {
    await this.companyRepository.delete(id);
    return true;
  }
}
