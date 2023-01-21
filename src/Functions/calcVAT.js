export const calcVAT = (product) => {
  product.addedVAT = product.priceWithoutVAT * (product.vat / 100);
};
