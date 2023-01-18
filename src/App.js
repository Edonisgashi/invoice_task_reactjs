import React, { useState, useEffect } from "react";

const App = () => {
  const [productName, setProductName] = useState("");
  const [productQTY, setProductQTY] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState(0);
  const [productVAT, setProductVAT] = useState();
  const [priceWithoutVAT, setPriceWithoutVAT] = useState();
  const [priceWithVAT, setPriceWithVAT] = useState();
  const [prices, setPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const [product, setProduct] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const correctInputs = () => {
    return (
      (productName.length > 0 || productName !== undefined) &&
      (productQTY > 0 || productQTY !== undefined) &&
      (productPrice > 0 || productPrice !== undefined) &&
      (productDiscount >= 0 || productDiscount !== undefined)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPriceWithoutVAT((productPrice - productDiscount) * productQTY);
    setPriceWithVAT(priceWithoutVAT * (productVAT / 100));
    if (correctInputs()) {
      const productObject = {
        name: productName,
        qty: productQTY,
        price: productPrice,
        vat: productVAT,
        discount: productDiscount,
        priceWithoutVAT: priceWithoutVAT,
        priceWithVAT: priceWithVAT,
      };

      console.log(productVAT);
      setProduct((prevState) =>
        prevState ? [...prevState, productObject] : [productObject]
      );

      console.log(product);
      console.log(productObject);
    }
  };
  useEffect(() => {
    console.log(product);
    if (product) {
      setShowTable(true);
    }
  }, [product]);
  return (
    <div>
      <form
        action=""
        className="d-flex flex-column w-25 my-5 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="my-1">
          <strong>Product's Name</strong>
        </label>
        <input
          className="my-1"
          type="text"
          placeholder="Product's name"
          id="name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="qty" className="my-1">
          <strong>Product's QTY</strong>
        </label>
        <input
          className="my-1"
          type="number"
          min={0}
          placeholder="Product's QTY"
          id="qty"
          onChange={(e) => setProductQTY(Number(e.target.value))}
        />
        <label htmlFor="price" className="my-1">
          <strong>Product's Price</strong>
        </label>
        <input
          type="number"
          className="my-1"
          id="price"
          min={0}
          step={0.01}
          placeholder="Product's Price"
          onChange={(e) => setProductPrice(Number(e.target.value))}
        />
        <label htmlFor="discount" className="my-1">
          <strong>Product's Discount</strong>
        </label>
        <input
          type="number"
          className="my-1"
          id="discount"
          min={0}
          max={productPrice * 0.5}
          step={0.01}
          placeholder="Max value of Discount can be 50% of price"
          onChange={(e) => setProductDiscount(Number(e.target.value))}
        />
        <div className="vat w-50 d-flex justify-content-around align-items-center my-1">
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
        </div>

        <button className="btn btn-outline-success w-50 my-3 mx-auto">
          Add Product
        </button>
      </form>
      {productPrice < 500 ? (
        <table className="table table-bordered table-hover w-75 mx-auto my-5">
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
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                      <td>{product.vat} %</td>
                      {product.priceWithVAT && product.priceWithoutVAT ? (
                        <td>
                          {product.priceWithoutVAT} + {product.priceWithVAT} ={" "}
                          {product.priceWithoutVAT + product.priceWithVAT}
                        </td>
                      ) : null}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default App;
