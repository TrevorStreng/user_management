import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HandlerService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }
}
