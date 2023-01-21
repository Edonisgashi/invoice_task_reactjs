export const calcPrices = (product) => {
  let prices;
  let VATs;
  let pricesAndVATs;
  const allPrices = [];
  const allVATs = [];
  const allPricesAndVATs = [];

  if (product.length > 0) {
    allPrices.push(product.priceWithoutVAT);
    allVATs.push(product.addedVAT);
    allPricesAndVATs.push(product.totalPrice);

    prices = allPrices.reduce((acc, el) => acc + el);
    VATs = allVATs.reduce((acc, el) => acc + el);
    pricesAndVATs = allPricesAndVATs.reduce((acc, el) => acc + el);
    console.log(prices, VATs, pricesAndVATs);
  }
};
