import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/Admin.dto';
import { Admin } from './admin.entity';
import { User } from 'src/users/user.entity';
import { error } from 'console';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAdmins(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async getAdmin(id: number) {
    return await this.adminRepository.findOneBy({ id });
  }

  async checkAdminByUserId(userId: number) {
    return await this.adminRepository.findOneBy({ user: { id: userId } });
  }

  async createAdmin(createAdminDto: AdminDto): Promise<Admin> {
    const { admin_level, user_id } = createAdminDto;
    console.log(createAdminDto);

    const user = await this.userRepository.findOneBy({ id: user_id });

    if (!user) throw new error(`No user found..`);

    const admin = this.adminRepository.create({
      admin_level,
      user,
    });
    return await this.adminRepository.save(admin);
  }

  async updateAdmin(id: number, updateAdminDto: AdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    return await this.adminRepository.findOneBy({ id });
  }

  async deleteAdmin(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
