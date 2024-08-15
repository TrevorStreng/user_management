import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // Use ObjectType for response DTOs
export class LoginDto {
  @Field()
  token: string;

  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
