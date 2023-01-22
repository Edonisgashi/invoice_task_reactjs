import React, { useState, useRef } from "react";
import "./App.css";
import Header from "./Components/Header";
import { calcPrices } from "./Functions/calcPrices";
import { correctInputs } from "./Functions/correctInputs";
import { formContext } from "./State/appContext";
import { calcultatePrice } from "./Functions/calculatePrice";
import { calcVAT } from "./Functions/calcVAT";
import { calcVATandPrice } from "./Functions/calcVATandPrice";
import Form from "./Components/Form";
import Invoice1 from "./Components/Invoice1";
import Invoice2 from "./Components/Invoice2";
const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [productName, setProductName] = useState("");
  const [productQTY, setProductQTY] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState(0);
  const [productVAT, setProductVAT] = useState();
  const [product, setProduct] = useState([]);
  const [productOver500, setProductOver500] = useState([]);
  const [productQtyOver50, setproductQtyOver50] = useState([]);
  const [remainingQty, setRemainingQty] = useState([]);
  const [prices, setPrices] = useState();
  const [VATs, setVATs] = useState();
  const [pricesAndVATs, setPricesAndVATs] = useState();

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
        // Setting to Product Variable of state managment only products which have a qty key less than 50
        setProduct((prevState) =>
          prevState
            ? [...prevState, productObject].filter((prod) => prod.qty < 50)
            : [productObject]
        );

        if (product.length > 0) {
          product.forEach((product) => {
            // Calculates Prices for each product ...s
            calcultatePrice(product);
            calcVAT(product);
            calcVATandPrice(product);
            // Storing calcPrices into a function in order to use returned values and set them to state in order to send later through props ...
            const result = calcPrices(product);

            setPrices(result.prices);
            setVATs(result.VATs);
            setPricesAndVATs(result.pricesAndVATs);
          });
        }

        console.log(product);
      } else {
        // This state will hold products which has a price over 500
        setProductOver500((prevState) =>
          prevState ? [...prevState, productObject] : [productObject]
        );
        console.log(productOver500);

        if (productOver500.length !== 0) {
          productOver500.forEach((productOver500) => {
            calcultatePrice(productOver500);
            calcVAT(productOver500);
            calcVATandPrice(productOver500);
          });
        }
      }
      if (productQTY > 50) {
        const qty50Arr = [];
        const remainingQtyArr = [];
        let otherqty = productQTY;

        // Here I divided qty in 50s and stored them in an array and that array I set to remainingQty state manager

        while (otherqty > 0) {
          const qty = otherqty > 50 ? 50 : otherqty;
          productObject.qty = qty;
          qty50Arr.push(productObject);
          remainingQtyArr.push(qty);
          calcultatePrice(productObject);
          calcVAT(productObject);
          calcVATandPrice(productObject);
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
        <Invoice1
          showTable={showTable}
          product={product}
          prices={prices}
          VATs={VATs}
          pricesAndVATs={pricesAndVATs}
        />
      ) : (
        productOver500.map((product, i) => <Invoice2 product={product} i={i} />)
      )}
      {productQtyOver50.length > 0
        ? productQtyOver50.map((product, i) => (
            <Invoice2 product={product} i={i} remainingQty={remainingQty} />
          ))
        : null}
    </div>
  );
};

export default App;
