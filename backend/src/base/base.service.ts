// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export abstract class BaseService<T> {
//   constructor(
//     // public x: unknown,
//     // @InjectRepository(x)
//     private baseRepository: Repository<T>,
//     // createDto: unknown,
//   ) {
//     // this.baseRepository = baseRepository;
//   }

//   async findAll(): Promise<T[]> {
//     return this.baseRepository.find();
//   }

//   async findOne(id: number): Promise<T> {
//     return this.baseRepository.findOneBy({ id });
//   }

//   // async createOne(createDto): Promise<T[]> {
//   //   const object = this.baseRepository.create(createDto);
//   //   return this.baseRepository.save(object);
//   // }
// }
