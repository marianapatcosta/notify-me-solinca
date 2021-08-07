const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomSentence = (sentences: string[]) => {
  const randomIndex = getRandomInt(0, sentences.length);
  return sentences[randomIndex];
};
