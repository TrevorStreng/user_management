import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User], { name: 'users' })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    try {
      this.usersService.deleteUser(id);

      return true;
    } catch (err) {
      return err;
    }
  }
}
