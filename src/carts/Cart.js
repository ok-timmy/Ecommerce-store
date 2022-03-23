import React from "react";
import CartItem from "./CartItem";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";

function Cart({ cartlist, handleEmptyCart, handleUpdateCart, handleDelete }) {
  // console.log(cartlist);
  const cartitems = cartlist.line_items;
  // console.log(cartitems);
  if (cartitems.length ===0) {
    return (
      <div className="d-flex align-items-center px-3 mt-4">
      <h3 className="font-bold">
        You have no items in your shopping cart, start adding some!
      </h3>
      </div>
    );
  } else {
    return (
      <>
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                </div>

               
                  {cartitems.map((cartitem) => {
                    return (
                      <CartItem
                        cartitem={cartitem}
                        key={cartitem.id}
                        className="cart__inner"
                        handleUpdateCart={handleUpdateCart}
                        handleDelete={handleDelete}
                      />
                    );
                  }
                )}

                <div className="card mb-4">
                  <div className="card-body p-4 d-flex flex-row">
                    <div className="form-outline flex-fill">
                      <h3>Total:</h3>
                    </div>
                    <h3>{cartlist.subtotal.formatted_with_symbol}</h3>
                  </div>
                </div>

                <div className="card mb-1">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-block btn-lg w-75 "
                      onClick={() => {
                        handleEmptyCart();
                      }}
                    >
                      Empty Cart
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <Link to={"/checkout"}>
                    <button
                      type="button"
                      className="btn btn-warning btn-block btn-lg"
                    >
                      Proceed to Checkout
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Cart;
