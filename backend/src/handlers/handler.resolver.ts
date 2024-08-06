import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HandlerService } from './handler.service';
import { Any } from 'typeorm';

@Resolver()
export class HandlerResolver<T> {
  constructor(private readonly handlerService: HandlerService<T>) {}

  @Query(() => [this], { name: 'findAll' })
  async findAll(): Promise<T[]> {
    return this.handlerService.getAll();
  }
}
