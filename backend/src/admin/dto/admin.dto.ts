import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AdminDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  admin_level: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
