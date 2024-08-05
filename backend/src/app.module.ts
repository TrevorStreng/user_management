import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataSource } from 'typeorm';
import { UserModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      // playground: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hippysinthecity420!',
      database: 'human_resources',
      entities: [User],
      synchronize: false,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
