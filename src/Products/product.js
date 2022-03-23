import * as React from "react";


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Product({ product, handleAddToCart }) {

  // console.log(process.env.REACT_APP_STRIPE_API_KEY)
// console.log(item)
  return (
    <div className="col-md-12 col-lg-3 mb-4 mb-lg-4">
        <div className="card text-black">
          <img
            src={product.image.url}
            className="card-img-top"
            style={{height: "280px", padding:"10px"}}
            alt="iPhone"
          />
          <div className="card-body">
            <div className="text-center mt-1">
              <h4 className="card-title">{product.name}</h4>
              <h6 className="text-primary mb-1 pb-3">Starting at {product.price.formatted_with_symbol}</h6>
            </div>

            <div className="d-flex flex-row">
              <button type="button" className="btn btn-danger flex-fill ms-1" onClick={()=> {handleAddToCart(product.id, 1)}}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
  );
}
