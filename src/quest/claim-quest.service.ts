import { Injectable } from '@nestjs/common';
import { ScoreCalculatorService } from '@/quest/score-calculator.service';
import { ClaimQuestRequestDto } from '@/quest/dto/claim-quest-request.dto';
import { ClaimQuestStatus } from '@/quest/enums';
import { ClaimQuestResponseDto } from '@/quest/dto/claim-quest-response.dto';

const MIN_SCORE_FOR_SUCCESS = 5;

@Injectable()
export class ClaimQuestService {
  constructor(
    private readonly scoreCalculatorService: ScoreCalculatorService,
  ) {}

  public claimQuest(dto: ClaimQuestRequestDto): ClaimQuestResponseDto {
    const response = new ClaimQuestResponseDto();
    response.status = ClaimQuestStatus.Fail;
    // TODO: implement ACL conditions check
    // TODO: implement user has not already completed the quest
    response.score = this.scoreCalculatorService.calculate(dto.submission_text);
    if (response.score >= MIN_SCORE_FOR_SUCCESS) {
      response.status = ClaimQuestStatus.Success;
    }
    return response;
  }
}
