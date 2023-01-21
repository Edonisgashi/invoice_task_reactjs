import React, { useContext } from "react";
import { formContext } from "../Context Object/formContext";
const Form = ({ handleSubmit }) => {
  const {
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
  } = useContext(formContext);
  return (
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
  );
};

export default Form;
