export const randomNum = (digits = 4) => {
  let min = Math.pow(10, digits - 1);
  let max = Math.pow(10, digits) - 1;
  if (digits === 1) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1));
};
