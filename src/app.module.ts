import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/report.entity';
import { Logger } from './middleware/logger.middleware';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          synchronize: true,
          entities: [User, Report]
        }
      }
    }),
     // without using config service
    // TypeOrmModule.forRoot({
    //   type: "sqlite",
    //   database: "db.sqlite",
    //   entities: [User, Report],
    //   synchronize: true
    // }),
    UsersModule,
    ReportsModule
  ],
})
export class AppModule implements NestModule {
  // way of applying middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes("/")
  }
}
