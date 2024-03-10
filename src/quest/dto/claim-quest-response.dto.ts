import { ClaimQuestStatus } from '@/quest/enums';

export class ClaimQuestResponseDto {
  status: ClaimQuestStatus;

  score: number;
}
