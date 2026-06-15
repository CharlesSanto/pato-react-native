export const formatCurrency = (value: string): string => {
  const numeric = value.replace(/\D/g, "");

  if (!numeric) return "";

  const number = (parseInt(numeric, 10) / 100).toFixed(2);

  return number.replace(".", ",");
};