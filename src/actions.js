export const GENERATE_ROULETTE = 'GENERATE_ROULETTE';
export const ROULETTE_SCOLLED = 'ROULETTE_SCOLLED';
// ===================================================
export const generateRoulette = () => {
  return {
    type: GENERATE_ROULETTE
  };
};
export const rouletteScrolled = () => {
  return {
    type: ROULETTE_SCOLLED
  };
};
