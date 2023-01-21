export const correctInputs = (
  productName,
  productQTY,
  productPrice,
  productDiscount
) => {
  return (
    productName.length > 0 &&
    productName !== undefined &&
    productQTY > 0 &&
    productQTY !== undefined &&
    productPrice > 0 &&
    productPrice !== undefined &&
    productDiscount >= 0 &&
    productDiscount !== undefined
  );
};
