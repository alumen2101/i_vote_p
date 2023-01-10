const MAX_DEX_ID = 5;

export const getRandomProfDex: (notThisOne?: number) => number = (
  notThisOne
) => {
  const profDexNumber = Math.floor(Math.random() * MAX_DEX_ID + 1);

  if (profDexNumber !== notThisOne) return profDexNumber;
  return getRandomProfDex(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId: number = getRandomProfDex();
  const secondId: number = getRandomProfDex(firstId);

  return [firstId, secondId];
};
