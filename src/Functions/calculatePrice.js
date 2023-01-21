export const calcultatePrice = (product) => {
  product.priceWithoutVAT = (product.price - product.discount) * product.qty;
};
