import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { Position } from './position.entity';
import { PositionService } from './position.service';
import { PositionDto } from './dto/position.dto';

@Resolver((of: any) => Position)
export class PositionResolver {
  constructor(private positionService: PositionService) {}

  @Query((returns) => [Position], { name: 'positions' })
  async getPositions() {
    return await this.positionService.getPositions();
  }

  @Query((returns) => Position, { name: 'position' })
  async getPosition(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Position> {
    return await this.positionService.getPosition(id);
  }

  @Mutation(() => Position, { name: 'createPosition' })
  async createPosition(
    @Args('createPositionInput') createPositionDto: PositionDto,
  ): Promise<Position> {
    return await this.positionService.createPosition(createPositionDto);
  }

  @Mutation(() => Position, { name: 'updatePosition' })
  async updatePosition(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePositionInput') updatePositionDto: PositionDto,
  ): Promise<Position> {
    return await this.positionService.updatePosition(id, updatePositionDto);
  }

  @Mutation(() => Boolean)
  async deletePosition(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.positionService.deletePosition(id);
    return true;
  }
}
