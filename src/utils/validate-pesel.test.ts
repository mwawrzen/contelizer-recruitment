import { PeselError } from "@/utils/types";
import { validatePESEL } from "@/utils/validate-pesel";

describe('Testing PESEL validation', () => {

  test('Should return NONE error for correct data', () => {
    expect(validatePESEL('03230906092')).toBe(PeselError.NONE);
  });

  test('Should return DATE error for wrong date', () => {
    expect(validatePESEL('03233206092')).toBe(PeselError.DATE);
  });

  test('Should return CHECK_DIGIT error for wrong check digit', () => {
    expect(validatePESEL('03230906094')).toBe(PeselError.CHECK_DIGIT);
  });

  test('Should return LENGTH error for wrong length', () => {
    expect(validatePESEL('03230906')).toBe(PeselError.LENGTH);
  });
});
