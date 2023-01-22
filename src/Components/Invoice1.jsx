const Invoice1 = ({ showTable, product, prices, VATs, pricesAndVATs }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover w-75 mx-auto my-5">
        <caption>Order ID : 1</caption>
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
                      {product.priceWithoutVAT?.toFixed(2)} +{" "}
                      {product.addedVAT?.toFixed(2)} = $
                      {product.totalPrice?.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>Subtotal</td>
            <td>$ {prices?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5}>VAT</td>
            <td>{VATs?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5}>Total to pay</td>
            <td>$ {pricesAndVATs?.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Invoice1;
