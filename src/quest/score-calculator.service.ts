import { Injectable } from '@nestjs/common';
import { InvalidArgumentException } from '@/shared/exceptions/invalid-argument.exception';

abstract class Result {
  constructor(public readonly value: string) {}
}

class Word extends Result {}

class Punctuation extends Result {}

enum Points {
  CONTAINS_ONE_PUNCTUATION = 1,
  CONTAINS_A_PALINDROM = 2,
  HAPPY_WORDS_MAX_POINTS = 3,
}

@Injectable()
export class ScoreCalculatorService {
  public calculate(text: string): number {
    let score = 0,
      punctuationsFound = 0,
      happyWordsFound = 0,
      hasOnePalindrome = false;

    const iterator = this.findWordGenerator(text);
    for (const result of iterator) {
      if (result instanceof Punctuation) {
        punctuationsFound++;
        continue;
      }
      if (!(result instanceof Word)) {
        throw new InvalidArgumentException(
          `Non-supported result returned by findWordGenerator(): expects ${Word.name}, got ${result.constructor.name}.`,
        );
      }
      if (
        happyWordsFound < Points.HAPPY_WORDS_MAX_POINTS &&
        this.isHappyWord(result.value.toLowerCase())
      ) {
        happyWordsFound++;
      }

      if (!hasOnePalindrome && this.isPalindrome(result.value)) {
        hasOnePalindrome = true;
      }
    }

    // TODO: improve point categories and enums
    if (punctuationsFound === 1) {
      score += Points.CONTAINS_ONE_PUNCTUATION;
    }
    if (hasOnePalindrome) {
      score += Points.CONTAINS_A_PALINDROM;
    }
    score += Math.min(happyWordsFound, Points.HAPPY_WORDS_MAX_POINTS);

    return score;
  }

  private *findWordGenerator(text: string): Generator<Result> {
    let word = [];
    for (let i = 0; i < text.length; i++) {
      const currentCharacter = text[i];
      const isPunctuation = this.isPunctuation(currentCharacter);
      if (isPunctuation) {
        yield new Punctuation(currentCharacter);
      }
      if (isPunctuation || this.isSpace(currentCharacter)) {
        yield new Word(word.join(''));
        word = [];
      } else {
        word.push(currentCharacter);
      }
    }
  }

  private isPunctuation(char: string): boolean {
    return char === ',' || char === '.' || char === '?' || char === '!';
  }

  private isSpace(char: string): boolean {
    return /\s/.test(char);
  }

  private isHappyWord(word: string): boolean {
    return (
      word === 'joyful' ||
      word === 'happy' ||
      word === 'vibrant' ||
      word === 'thrilled' ||
      word === 'euphoric' ||
      word === 'cheerful' ||
      word === 'delighted'
    );
  }

  private isPalindrome(word: string): boolean {
    if (word.length <= 1) {
      return false;
    }
    for (let i = 0; i < word.length / 2; i++) {
      if (word[i] !== word[word.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
}
