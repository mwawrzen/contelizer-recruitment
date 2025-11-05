import { PeselError } from "@/utils/types";
import { validatePESEL } from "@/utils/validate-pesel";

describe('Testing PESEL validation', () => {

  test('PESEL is correct', () => {
    expect(validatePESEL('03230906092')).toBe(PeselError.NONE);
  });

  test('Wrong date format', () => {
    expect(validatePESEL('03233206092')).toBe(PeselError.DATE);
  });

  test('Wrong check digit', () => {
    expect(validatePESEL('03230906094')).toBe(PeselError.CHECK_DIGIT);
  });

  test('Wrong length', () => {
    expect(validatePESEL('03230906')).toBe(PeselError.LENGTH);
  });
});
