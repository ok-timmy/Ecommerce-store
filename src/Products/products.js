import React, {useState, useEffect } from 'react';
import {commerce} from '../lib/commerce';
import Product from './product';
// import Grid from '@mui/material/Grid'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

console.log(commerce);

 export default function Products({fetchProducts, handleAddToCart }) {
     
 const [items, setItems] = useState([]);
// console.log(fetchProducts, handleAddToCart)

 useEffect(() => {
    fetchProducts(setItems);
    // console.log(fetchProducts)
 }, []);
     return (
       <>
      <section style={{backgroundColor: '#eee'}}>
      <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-bold mb-0 text-black">Products</h3>
                  </div>
  <div class="container py-5 px-3">
    <div class="row">
      {items.map((item) => {
          return <Product item={item} handleAddToCart={handleAddToCart}/>
      })}
    </div>
  </div>
</section>
       </>
        )
 }


 /* 

      <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
        <div class="card text-black">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img2.webp"
            class="card-img-top"
            alt="iPhone"
          />
          <div class="card-body">
            <div class="text-center mt-1">
              <h4 class="card-title">iPhone 11</h4>
              <h6 class="text-primary mb-1 pb-3">Starting at $499</h6>
            </div>


            <div class="d-flex flex-row">
              <button type="button" class="btn btn-danger flex-fill ms-1">Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
        <div class="card text-black">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img3.webp"
            class="card-img-top"
            alt="iPhone"
          />
          <div class="card-body">
            <div class="text-center mt-1">
              <h4 class="card-title">iPhone 11 Pro</h4>
              <h6 class="text-primary mb-1 pb-3">Starting at $599</h6>
            </div>

            <div class="d-flex flex-row">
              <button type="button" class="btn btn-danger flex-fill ms-1">Buy now</button>
            </div>
          </div>
        </div>
      </div>
*/