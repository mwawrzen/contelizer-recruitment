import { PeselError } from "./types";

export function validatePESEL(pesel: string): PeselError {
  if (pesel.length !== 11)
    return PeselError.LENGTH;
  if (!isDateCorrect(pesel))
    return PeselError.DATE;
  if (!isCheckDigitCorrect(pesel))
    return PeselError.CHECK_DIGIT;
  return PeselError.NONE;
};

function isCheckDigitCorrect(pesel: string): boolean {

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
  let checksum = 0;

  for (let i = 0; i < pesel.length - 1; i++)
    checksum += Number(pesel[i]) * weights[i];

  const checkDigit = (10 - (checksum % 10)) % 10;

  if (checkDigit !== Number(pesel[10]))
    return false;

  return true;
}

const yearScopes = [
  { startDate: 1800, modifier: 80 },
  { startDate: 1900, modifier: 0 },
  { startDate: 2000, modifier: 20 },
  { startDate: 2100, modifier: 40 },
  { startDate: 2200, modifier: 60 },
];

function isDateCorrect(pesel: string): boolean {

  const yearFromPesel = pesel.slice(0, 2);
  const monthFromPesel = pesel.slice(2, 4);
  const dayFromPesel = pesel.slice(4, 6);

  let year: number = 0, month: number = 0, isSet: boolean = false;

  const monthNum = Number(monthFromPesel);

  yearScopes.forEach(scope => {
    if (!isSet && monthNum >= scope.modifier + 1 && monthNum <= scope.modifier + 12) {
      year = scope.startDate + Number(yearFromPesel);
      month = monthNum - scope.modifier;
      isSet = true;
    }
  });

  if (!isSet)
    return false;

  const day = Number(dayFromPesel);
  const dateOfBirth = new Date(year, month - 1, day);

  if (
    dateOfBirth.getFullYear() !== year ||
    dateOfBirth.getMonth() + 1 !== month ||
    dateOfBirth.getDate() !== day
  ) {
    return false;
  }

  return true;
}
