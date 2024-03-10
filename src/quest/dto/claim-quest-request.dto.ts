export class ClaimQuestRequestDto {
  questId: string;

  userId: string;

  claimed_at: Date;

  access_conditions: Array<object>;

  user_data: Record<string, unknown>;

  submission_text: string;
}
