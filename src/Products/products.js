import React from "react";
import Product from "./product";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// console.log(commerce);

export default function Products({ myproducts, handleAddToCart }) {
  // console.log(myproducts);
  const products = myproducts.data;
  // console.log(products);
  return (
    <>
      {/* <div>This Worked</div> */}
      <section style={{ backgroundColor: "#eee" }}>
      <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
        <div>
          <h3 className="fw-bold mb-0 text-black">Products</h3>
        </div>
        <div className="container py-5 px-3">
          <div className="row">
            {products.map((product) => {
              return (
                <Product product={product} key={product.id} handleAddToCart={handleAddToCart} />
              );
            })}
          </div>
        </div>
        </div>
        </div>
        </div>
      </section>
    </>
  );
}
