import { Module } from '@nestjs/common';
import { QuestController } from './quest/quest.controller';
import { QuestModule } from '@/quest/quest.module';

@Module({
  imports: [QuestModule],
  controllers: [QuestController],
})
export class ApiModule {}
