import { Args, Query, Resolver, Mutation, Int, Context } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Resolver((of: any) => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query((returns) => [Company], { name: 'Companies' })
  async findAll() {
    return await this.companyService.getCompanies();
  }

  @Query((returns) => Company, { name: 'companyByInput' })
  async getCompanyByInput(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Company> {
    return await this.companyService.getCompany(id);
  }
  @Query((returns) => Company, { name: 'companyByJwt' })
  @UseGuards(AuthGuard)
  async getCompanyByJwt(@Context('user') user): Promise<Company> {
    const id = user.sub;
    return await this.companyService.getCompany(id);
  }

  @Mutation((returns) => Company, { name: 'createCompany' })
  async createCompany(
    @Args('createCompanyInput') createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.createCompany(createCompanyDto);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async updateCompany(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCompanyInput') updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Mutation(() => Boolean)
  async deleteCompany(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.companyService.deleteCompany(id);
    return true;
  }
}
