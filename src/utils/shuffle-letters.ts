const lettersRegex = /[0-9a-zA-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;

function getLinesFromText(text: string): string[] {

  const trimmedText = text.trim();
  const lines = trimmedText.split('\n');
  const trimmedLines = lines.map(line => line.trim());

  return trimmedLines;
}

function getNumberToFirstLetter(signs: string[]): number {
  return signs.findIndex(sign => !!sign.match(lettersRegex)) + 1;
}

function isLetter(sign: string): boolean {
  return !!sign.match(lettersRegex);
}

function shuffleLettersInLine(line: string): string {

  const signs = [...line];

  if (signs.length === 0)
    return '';

  const startNumber = getNumberToFirstLetter(signs);
  const endNumber = getNumberToFirstLetter([...signs].reverse());

  for (let i = signs.length - 1 - endNumber; i > startNumber; i--) {
    const j = Math.floor(Math.random() * (i + 1 - startNumber) + startNumber);
    if (!isLetter(signs[i]) || !isLetter(signs[j]))
      continue;
    [signs[i], signs[j]] = [signs[j], signs[i]];
  }

  const shuffledLine = signs.join('');

  return shuffledLine;
}

export function shuffleLettersInText(text: string): string {

  const lines = getLinesFromText(text);
  const shuffledLines = lines.map(line => shuffleLettersInLine(line));
  const shuffledText = shuffledLines.join('\n');

  return shuffledText;
};
