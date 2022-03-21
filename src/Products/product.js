import * as React from "react";


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Product({ item, handleAddToCart }) {

// console.log(item)
  return (
    <div class="col-md-12 col-lg-4 mb-4 mb-lg-4">
        <div class="card text-black">
          <img
            src={item.image.url}
            class="card-img-top"
            style={{height: "350px", padding:"10px"}}
            alt="iPhone"
          />
          <div class="card-body">
            <div class="text-center mt-1">
              <h4 class="card-title">{item.name}</h4>
              <h6 class="text-primary mb-1 pb-3">Starting at {item.price.formatted_with_symbol}</h6>
            </div>

            <div class="d-flex flex-row">
              <button type="button" class="btn btn-danger flex-fill ms-1" onClick={()=> {handleAddToCart(item.id, 1)}}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
  );
}
