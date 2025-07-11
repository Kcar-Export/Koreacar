export const moneyFormatter = (val) => {
  const formattedPrice = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })).format(val);
  return formattedPrice;
}