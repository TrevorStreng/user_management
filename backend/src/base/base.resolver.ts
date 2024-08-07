// import { Type } from '@nestjs/common';
// import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { BaseService } from './base.service';

// export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
//   @Resolver({ isAbstract: true })
//   abstract class BaseResolverHost {
//     constructor(
//       private readonly baseService: BaseService<T>,
//       private readonly createDto,
//       private readonly updateDto,
//       private readonly Entity,
//     ) {}
//     @Query((type) => [classRef], { name: `getAll${classRef.name}` })
//     async findAll(): Promise<T[]> {
//       return this.baseService.findAll();
//     }

//     // @Query((type) => classRef, { name: `get${classRef.name}` })
//     // async findOne(@Args('id', { type: () => Int }) id: number): Promise<T> {
//     //   return this.baseService.findOne(id);
//     // }

//     @Mutation(() => Entity, { name: 'createOne' })
//     async createOne(@Args('createOneInput') createDto): Promise<T[]> {
//       return this.baseService.createOne(createDto);
//     }
//   }
//   return BaseResolverHost;
// }
