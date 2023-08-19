const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 2 });
export default formatCurrency;
