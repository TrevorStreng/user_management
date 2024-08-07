// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export abstract class BaseService<T> {
//   constructor(
//     protected baseRepository: Repository<T>,
//     createDto: unknown,
//   ) {}

//   async findAll(): Promise<T[]> {
//     return this.baseRepository.find();
//   }

//   // async findOne(id: number): Promise<T | null> {
//   //   return this.baseRepository.findOneBy({ id });
//   // }

//   async createOne(createDto): Promise<T[]> {
//     const object = this.baseRepository.create(createDto);
//     return this.baseRepository.save(object);
//   }
// }
