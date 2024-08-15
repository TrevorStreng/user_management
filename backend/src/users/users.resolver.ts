import { Args, Query, Resolver, Mutation, Int, Context } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(private usersService: UsersService) {
    // super(usersService, User);
  }

  @Query((returns) => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.getUsers();
  }

  @Query((returns) => User, { name: 'userById' })
  @UseGuards(AuthGuard)
  async getUserById(@Context('user') user): Promise<User> {
    const id = user.sub;
    return await this.usersService.getUserById(id);
  }

  @Query((returns) => User, { name: 'userByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<User> {
    return await this.usersService.getUserByEmail(email);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    try {
      await this.usersService.deleteUser(id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
