import React from "react";

const Invoice2 = ({ product, i, remainingQty }) => {
  if (product) {
    return (
      <table
        className="table table-bordered table-hover w-75 mx-auto my-5"
        key={i}
      >
        <caption>Order ID : {i + 1}</caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Discount</th>
            <th>VAT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.name}</td>
            <td>{product.qty}</td>
            <td>${product.price}</td>
            <td>${product.discount}</td>
            <td>{product.vat} %</td>
            <td>
              {product.priceWithoutVAT?.toFixed(2)} +{" "}
              {product.addedVAT?.toFixed(2)} = ${product.totalPrice?.toFixed(2)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>Subtotal</td>
            <td>$ {product.priceWithoutVAT?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5}>VAT</td>
            <td>{product.addedVAT?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5}>Total to pay</td>
            <td>$ {product.totalPrice?.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
};

export default Invoice2;
