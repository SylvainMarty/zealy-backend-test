import { Module } from '@nestjs/common';
import { ScoreCalculatorService } from './score-calculator.service';
import { ClaimQuestService } from '@/quest/claim-quest.service';

@Module({
  providers: [ScoreCalculatorService, ClaimQuestService],
  exports: [ClaimQuestService],
})
export class QuestModule {}
