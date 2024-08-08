import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { PerformanceReview } from './performanceReview.entity';
import { PerformanceReviewService } from './performanceReview.service';
import { PerformanceReviewDto } from './dto/performanceReview.dto';

@Resolver((of: any) => PerformanceReview)
export class PerformanceReviewResolver {
  constructor(private performanceReviewService: PerformanceReviewService) {}

  @Query((returns) => [PerformanceReview], { name: 'PerformanceReviews' })
  async getPerformanceReviews(): Promise<PerformanceReview[]> {
    return await this.performanceReviewService.getPerformanceReviews();
  }

  @Query((returns) => PerformanceReview, { name: 'performanceReview' })
  async getPerformanceReview(id: number): Promise<PerformanceReview> {
    return this.performanceReviewService.getPerformanceReview(id);
  }

  @Mutation(() => PerformanceReview, { name: 'cretePerformanceReview' })
  async createPerformanceReview(
    @Args('createPerformanceReviewInput')
    createPerformanceReviewDto: PerformanceReviewDto,
  ): Promise<PerformanceReview> {
    return await this.performanceReviewService.createPerformanceReview(
      createPerformanceReviewDto,
    );
  }

  @Mutation(() => PerformanceReview, { name: 'updatePerformanceReview' })
  async updatePerformanceReview(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePerformanceReviewInput')
    updatePerformanceReviewDto: PerformanceReviewDto,
  ): Promise<PerformanceReview> {
    return await this.performanceReviewService.updatePerformanceReview(
      id,
      updatePerformanceReviewDto,
    );
  }

  @Mutation(() => Boolean, { name: 'deletePerformanceReview' })
  async deletePerformanceReview(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.performanceReviewService.deletePerformanceReview(id);
    return true;
  }
}
