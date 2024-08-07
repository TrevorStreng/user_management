import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class PositionDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  position_title: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  department_id: number;
}
