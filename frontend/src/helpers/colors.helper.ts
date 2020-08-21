export const getRandomColor = () => {
  const hex = Array.from({length: 6})
    .map(() => (Math.random() * 16) | 0)
    .map(n => n.toString(16))
    .join('');
  return '#' + hex;
};
