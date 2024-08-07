import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// import { BaseResolver } from 'src/base/base.resolver';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(private usersService: UsersService) {
    // super(usersService, createUserDto, updateUserDto, User);
  }

  @Query((returns) => [User], { name: 'users' })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Mutation(() => User, { name: 'updateUser' })
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
