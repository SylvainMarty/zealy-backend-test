import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';
import { AccessControlListModule } from './access-control-list/access-control-list.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QuestModule,
    UserModule,
    AccessControlListModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
