export const formatValue = (value: number): string => {
  return value ? value?.toFixed(2) : value?.toString();
};
