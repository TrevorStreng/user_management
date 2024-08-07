import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class DepartmentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  department_name: string;
}
