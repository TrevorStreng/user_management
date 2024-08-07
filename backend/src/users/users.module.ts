import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Admin } from 'src/admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin])],
  providers: [UserResolver, UsersService],
})
export class UserModule {}
