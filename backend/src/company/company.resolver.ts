import { Args, Query, Resolver, Mutation, Int, Context } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { AdminService } from 'src/admin/admin.service';

@Resolver((of: any) => Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private adminService: AdminService,
  ) {}

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
  @UseGuards(AuthGuard)
  async createCompany(
    @Context('user') user,
    @Args('createCompanyInput')
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    // TODO: when creating a company make creator an admin
    await this.adminService.createAdmin({ admin_level: 1, user_id: user.sub });

    return await this.companyService.createCompany(createCompanyDto);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  @UseGuards(AuthGuard)
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
