import { Test, TestingModule } from '@nestjs/testing';
import { ScoreCalculatorService } from './score-calculator.service';

describe('ScoreCalculatorService', () => {
  let service: ScoreCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreCalculatorService],
    }).compile();

    service = module.get<ScoreCalculatorService>(ScoreCalculatorService);
  });

  describe('calculate', () => {
    test.each([
      'Some sentence.',
      'Some sentence, and more',
      'Some angry sentence!',
      'Some questionable sentence?',
    ])('returns 1 when input text contains one punctuation', (text: string) => {
      const score = service.calculate(text);

      expect(score).toEqual(1);
    });

    test.each([
      'Some weird! sentence.',
      'Some sentence, and more.',
      'Some questionable angry sentence?!',
      'Some questionable, and more sentence?',
      ',.?!',
    ])(
      'returns 0 when input text contains multiple punctuations',
      (text: string) => {
        const score = service.calculate(text);

        expect(score).toEqual(0);
      },
    );

    test.each([
      { sentence: 'I love my joyful life', expects: 1 },
      { sentence: 'I love my happy life', expects: 1 },
      { sentence: 'I love my vibrant life', expects: 1 },
      { sentence: 'I love my thrilled life', expects: 1 },
      { sentence: 'I love my euphoric life', expects: 1 },
      { sentence: 'I love my cheerful life', expects: 1 },
      { sentence: 'I love my delighted life', expects: 1 },
      { sentence: 'I love my joyful, happy, cheerful life', expects: 3 },
      {
        sentence: 'I love my joyful, happy, cheerful, and euphoric life',
        expects: 3,
      },
    ])(
      'returns $expects when input text contains some happy words ($sentence)',
      ({ sentence, expects }) => {
        const score = service.calculate(sentence);

        expect(score).toEqual(expects);
      },
    );

    test.each([
      { sentence: 'I love when bob cook for me', expects: 2 },
      { sentence: 'I love when the baab is visible in the sky', expects: 2 },
    ])(
      'returns $expects when input text contains happy words ($sentence)',
      ({ sentence, expects }) => {
        const score = service.calculate(sentence);

        expect(score).toEqual(expects);
      },
    );

    it('returns 4 when the sentence contains one of each criteria', () => {
      const score = service.calculate('I am happy when bob cook for me.');

      expect(score).toEqual(4);
    });
  });
});
