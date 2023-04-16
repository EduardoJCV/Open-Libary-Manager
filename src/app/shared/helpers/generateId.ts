export const generateId = (): string => {
  const date = new Date();
  const components = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];

  return components.join('');
};
