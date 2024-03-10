import { Body, Controller, Post, Req } from '@nestjs/common';
import { ClaimQuestService } from '@/quest/claim-quest.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('quest')
export class QuestController {
  constructor(private readonly claimQuestService: ClaimQuestService) {}

  @Post('/claim')
  @ApiBody({ type: Object })
  public claim(@Req() req) {
    // TODO: implement dto conversion layer between API and business code
    return this.claimQuestService.claimQuest(req.body);
  }
}
