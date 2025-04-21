export const maskNumber = num => {
  const str = num.toString();
  if (num.length < 4) return num; // just in case
  const start = str?.slice(0, 1);
  const end = str?.slice(-1);
  return `${start}********${end}`;
};
