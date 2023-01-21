export const calcVATandPrice = (product) => {
  product.totalPrice = product.priceWithoutVAT + product.addedVAT;
};
