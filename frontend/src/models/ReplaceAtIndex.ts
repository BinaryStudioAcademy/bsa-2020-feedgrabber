export default <T>(arr: T[], val: T, index: number) => {
  return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
};