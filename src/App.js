import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { calcPrices } from "./Functions/calcPrices";
import { correctInputs } from "./Functions/correctInputs";
import { formContext } from "./Context Object/formContext";
import { calcultatePrice } from "./Functions/calculatePrice";
import { calcVAT } from "./Functions/calcVAT";
import { calcVATandPrice } from "./Functions/calcVATandPrice";
import Form from "./Components/Form";
// import { prices, VATs, pricesAndVATs } from "./Functions/calcPrices";
import Invoice from "./Components/Invoice1";
import Invoice2 from "./Components/Invoice2";
const App = () => {
  const [productName, setProductName] = useState("");
  const [productQTY, setProductQTY] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState(0);
  const [productVAT, setProductVAT] = useState();
  const [product, setProduct] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [productOver500, setProductOver500] = useState([]);
  const [productQtyOver50, setproductQtyOver50] = useState([]);
  const [remainingQty, setRemainingQty] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);

    if (correctInputs(productName, productQTY, productPrice, productDiscount)) {
      const productObject = {
        name: productName,
        qty: productQTY,
        price: productPrice,
        vat: productVAT,
        discount: productDiscount,
      };

      if (productPrice < 500) {
        setProduct((prevState) =>
          prevState
            ? [...prevState, productObject].filter((prod) => prod.qty < 50)
            : [productObject]
        );

        if (product.length) {
          product.forEach((product) => {
            calcultatePrice(product);
            calcVAT(product);
            calcVATandPrice(product);
            calcPrices(product);
          });
        }

        console.log(product);
      } else {
        setProductOver500((prevState) =>
          prevState ? [...prevState, productObject] : [productObject]
        );
        console.log(productOver500);
        if (productOver500.length) {
          productOver500.forEach((productOver500) => {
            calcultatePrice(productOver500);
            calcVAT(productOver500);
            calcVATandPrice(productOver500);
            calcPrices(productOver500);
          });
        }
      }
      if (productQTY > 50) {
        const qty50Arr = [];
        const remainingQtyArr = [];
        let otherqty = productQTY;
        while (otherqty > 0) {
          const qty = otherqty > 50 ? 50 : otherqty;
          productObject.qty = qty;
          qty50Arr.push(productObject);
          remainingQtyArr.push(qty);
          calcultatePrice(productObject);
          calcVAT(productObject);
          calcVATandPrice(productObject);
          calcPrices(qty50Arr);
          console.log(qty50Arr);
          otherqty -= qty;
        }
        console.log(remainingQty);
        setproductQtyOver50(qty50Arr.filter((prod) => prod.qty >= 50));
        setRemainingQty(remainingQtyArr);

        console.log(productQtyOver50);
      }
    }
  };

  return (
    <div>
      <Header />
      <formContext.Provider
        value={{
          productName,
          setProductName,
          productQTY,
          setProductQTY,
          productPrice,
          setProductPrice,
          productDiscount,
          setProductDiscount,
          productVAT,
          setProductVAT,
        }}
      >
        <Form handleSubmit={handleSubmit} />
      </formContext.Provider>
      {productPrice < 500 && productQTY < 50 ? (
        <Invoice showTable={showTable} product={product} />
      ) : productOver500.length > 0 ? (
        productOver500.map((product, i) => (
          <Invoice2 product={product} key={i} />
        ))
      ) : null}
      {productQtyOver50.length > 0
        ? productQtyOver50.map((product, i) => (
            <Invoice2 product={product} key={i} remainingQty={remainingQty} />
          ))
        : null}
    </div>
  );
};

export default App;
