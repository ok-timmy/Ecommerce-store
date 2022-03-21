import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function Cart({ fetchCart, handleEmptyCart, handleUpdateCart, handleDelete }) {
  console.log(fetchCart);
  // const cartproducts = cart
  // console.log(handleEmptyCart)
  const [cartproducts, setCartproducts] = useState({});
  // const [cartitems, setCartitems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart(setCartproducts);
    setLoading(false);
  }, []);

  console.log(cartproducts);
const cartitems = cartproducts.line_items;
console.log(cartitems)
  const callCart = () => {
    if (!cartitems) {
      return (
        <p className="cart__none">
          You have no items in your shopping cart, start adding some!
        </p>
      );
    } else {
      // console.log(cartproducts)
      return (
        <>
           <div class="card">
                    <div class="card-body d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        class="btn btn-danger btn-block btn-lg w-50 "
                        onClick={()=>{handleEmptyCart()}}
                      >
                        Empty Cart
                      </button>
                    </div>
                  </div>
          <section class="h-100" style={{ backgroundColor: "#eee" }}>
            <div class="container h-100 py-5">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-10">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
                  </div>

               {cartitems === undefined ? <div>Loading...</div> : cartitems.map((cartitem)=> {
                  return <CartItem
                  cartitem={cartitem}
                  key={cartitem.id}
                  className="cart__inner"
                  handleUpdateCart={handleUpdateCart}
                  handleDelete ={handleDelete}
                />
               })}
                  

                  <div class="card">
                    <div class="card-body">
                      <button
                        type="button"
                        class="btn btn-warning btn-block btn-lg"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  };

  return <div>{loading ? <div>Loading</div> : <div>{callCart()}</div>}</div>;
}

export default Cart;


    