import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
const App = () => {
  const [productName, setProductName] = useState("");
  const [productQTY, setProductQTY] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState(0);
  const [productVAT, setProductVAT] = useState();
  const [product, setProduct] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [productOver500, setProductOver500] = useState([]);
  const correctInputs = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);

    if (correctInputs()) {
      const productObject = {
        name: productName,
        qty: productQTY,
        price: productPrice,
        vat: productVAT,
        discount: productDiscount,
        priceWithoutVAT: (productPrice - productDiscount) * productQTY,
      };
      productObject.addedVAT =
        productObject.priceWithoutVAT * (productObject.vat / 100);
      productObject.totalPrice =
        productObject.priceWithoutVAT + productObject.addedVAT;
      if (productPrice < 500) {
        setProduct((prevState) =>
          prevState ? [...prevState, productObject] : [productObject]
        );
      } else {
        setProductOver500((prevState) =>
          prevState ? [...prevState, productObject] : [productObject]
        );
        console.log(productOver500);
      }
    }
  };
  const allPrices = [];
  const allVATs = [];
  const allPricesAndVATs = [];
  let prices = 0;
  let VATs = 0;
  let pricesAndVATs = 0;
  if (product.length > 0) {
    product.map((prd) => {
      allPrices.push(prd.priceWithoutVAT);
      allVATs.push(prd.addedVAT);
      allPricesAndVATs.push(prd.totalPrice);
    });
    prices = allPrices.reduce((acc, el) => acc + el);
    VATs = allVATs.reduce((acc, el) => acc + el);
    pricesAndVATs = allPricesAndVATs.reduce((acc, el) => acc + el);
    console.log(prices, VATs, pricesAndVATs);

    console.log(allPrices);
    console.log(allVATs);
    console.log(allPricesAndVATs);
  }

  return (
    <div>
      <Header />
      <form
        action=""
        className="d-flex flex-column w-25 my-5 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="my-1">
          <strong>Product's Name</strong>
        </label>
        <input
          className="my-1 form-control"
          type="text"
          value={productName}
          placeholder="Product's name"
          id="name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="qty" className="my-1">
          <strong>Product's QTY</strong>
        </label>
        <input
          className="my-1 form-control"
          type="number"
          min={0}
          value={productQTY}
          placeholder="Product's QTY"
          id="qty"
          onChange={(e) => setProductQTY(Number(e.target.value))}
        />
        <label htmlFor="price" className="my-1">
          <strong>Product's Price</strong>
        </label>
        <input
          type="number"
          className="my-1 form-control"
          id="price"
          min={0}
          value={productPrice}
          step={0.01}
          placeholder="Product's Price"
          onChange={(e) => setProductPrice(Number(e.target.value))}
        />
        <label htmlFor="discount" className="my-1">
          <strong>Product's Discount</strong>
        </label>
        <input
          type="number"
          className="my-1 form-control"
          id="discount"
          value={productDiscount}
          min={0}
          step={0.01}
          placeholder="Max value of Discount can be 50% of price"
          onChange={(e) => setProductDiscount(Number(e.target.value))}
        />
        <div className="vat w-75 d-flex justify-content-around align-items-center my-1">
          <label htmlFor="vat">
            <strong>Product's VAT:</strong>
          </label>
          <input
            type="radio"
            name="vat"
            value={8}
            checked={productVAT === 8}
            onChange={(e) => setProductVAT(Number(e.target.value))}
          />{" "}
          8%
          <input
            type="radio"
            name="vat"
            value={18}
            checked={productVAT === 18}
            onChange={(e) => setProductVAT(Number(e.target.value))}
          />{" "}
          18%
          <input
            type="radio"
            name="vat"
            value={22}
            checked={productVAT === 22}
            onChange={(e) => setProductVAT(Number(e.target.value))}
          />{" "}
          22%
        </div>

        <button className="btn btn-outline-primary w-50 my-3 mx-auto">
          Add Product
        </button>
      </form>
      {productPrice < 500 ? (
        <table className="table table-bordered table-hover w-75 mx-auto my-5">
          {product.map((product, i) => {
            return <caption>Order ID : {i + 1}</caption>;
          })}
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
            {showTable
              ? product.map((product, i) => {
                  return (
                    <tr key={i}>
                      <td>{product.name}</td>
                      <td>{product.qty}</td>
                      <td>${product.price}</td>
                      <td>${product.discount}</td>
                      <td>{product.vat} %</td>
                      <td>
                        {product.priceWithoutVAT.toFixed(2)} +{" "}
                        {product.addedVAT.toFixed(2)} = $
                        {product.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>Subtotal</td>
              <td>$ {prices.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={5}>VAT</td>
              <td>{VATs.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={5}>Total to pay</td>
              <td>$ {pricesAndVATs.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      ) : null}
      {productOver500.length > 0
        ? productOver500.map((product, i) => {
            return (
              <>
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
                    <tr key={i}>
                      <td>{product.name}</td>
                      <td>{product.qty}</td>
                      <td>${product.price}</td>
                      <td>${product.discount}</td>
                      <td>{product.vat} %</td>
                      <td>
                        {product.priceWithoutVAT.toFixed(2)} +{" "}
                        {product.addedVAT.toFixed(2)} = $
                        {product.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5}>Subtotal</td>
                      <td>$ {product.priceWithoutVAT.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={5}>VAT</td>
                      <td>{product.addedVAT.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={5}>Total to pay</td>
                      <td>$ {product.totalPrice.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </>
            );
          })
        : null}
    </div>
  );
};

export default App;
