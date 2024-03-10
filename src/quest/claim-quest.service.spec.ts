import { Test, TestingModule } from '@nestjs/testing';
import { ClaimQuestService } from '@/quest/claim-quest.service';
import { ClaimQuestRequestDto } from '@/quest/dto/claim-quest-request.dto';
import { ClaimQuestResponseDto } from '@/quest/dto/claim-quest-response.dto';
import { ClaimQuestStatus } from '@/quest/enums';
import { ScoreCalculatorService } from '@/quest/score-calculator.service';

const getSampleRequest = () => ({
  questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5', // uuid
  userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7', // uuid
  claimed_at: '2023-03-15T10:44:22+0000', // date in ISO 8601 format
  access_condition: [
    // array of condition object, variable in size
    {
      type: 'discordRole', //check if a user discord roles contains a specific role
      operator: 'contains', //can be "contains" or "notContains"
      value: '1163897602547392553', // Id of the discord role
    },
    {
      type: 'date', // check if the claimed_at date is > or < to the specified value
      value: '2023-02-15T10:44:22+0000',
      operator: '>', //can be ">" or "<"
    },
    {
      type: 'level', // check if the user level is > or < to the specified value
      value: '4', // positive integer
      operator: '>', // operator can be ">" or "<"
    },
  ],
  user_data: {
    completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'], // array of uuid
    discordRoles: ['1163897602547392553', '1194056197100286162'], // array of discord roles IDs
    level: 3, // positive integer
  },
  submission_text: 'Lorem ipsum dolor sit amet.', // string
});

describe('ClaimQuestService', () => {
  let service: ClaimQuestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreCalculatorService, ClaimQuestService],
    }).compile();

    service = module.get<ClaimQuestService>(ClaimQuestService);
  });

  it('returns a failed claim with score = 4', () => {
    const request = getSampleRequest();
    request.submission_text = 'I am happy when bob cook for me.';

    const result = service.claimQuest(
      Object.assign(new ClaimQuestRequestDto(), request),
    );

    const expectedResponse = new ClaimQuestResponseDto();
    expectedResponse.status = ClaimQuestStatus.Fail;
    expectedResponse.score = 4;
    expect(result).toEqual(expectedResponse);
  });

  it('returns a succeeded claim with score = 5', () => {
    const request = getSampleRequest();
    request.submission_text = 'I am happy and joyful when bob cook for me.';

    const result = service.claimQuest(
      Object.assign(new ClaimQuestRequestDto(), request),
    );

    const expectedResponse = new ClaimQuestResponseDto();
    expectedResponse.status = ClaimQuestStatus.Success;
    expectedResponse.score = 5;
    expect(result).toEqual(expectedResponse);
  });
});
