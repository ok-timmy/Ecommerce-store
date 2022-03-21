import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./component/Appbar";
import { commerce } from "./lib/commerce";
import Products from "./Products/products";
import Cart from "./carts/Cart";
import Checkout from "./Checkout/Checkout";

function App() {
  const [cartlist, setCartlist] = useState({});
  // const [products, setProducts] = useState({})

  async function fetchCart(setY) {
    await commerce.cart
      .retrieve()
      .then((cart) => {
        const cartListProd = cart;
        console.log(cartListProd);
        // console.log(cartlist);
        // return cart;
        setY(cartListProd);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
        console.log(cartlist);
      });
  }

  async function fetchProducts( setX) {
    await commerce.products.list().then((products)=> {
      const setprod = () => {  setX(products.data) }
       setprod();
         console.log(products.data);
         console.log(products, handleAddToCart);
     })
    }

  useEffect(() => {
    // fetchProducts();
    fetchCart(setCartlist);
  }, []);

  console.log(cartlist);

  const handleAddToCart = async (productId, quantity) => {
    await commerce.cart
      .add(productId, quantity)
      .then((item) => {
        console.log(item);
        commerce.cart.contents().then((items) => setCartlist(items));
        console.log(cartlist)
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
    console.log("I added a new product", cartlist);
    ;
  };

  const handleUpdateCart = async (cart_id, Anumber) => {
    await commerce.cart
      .update(cart_id, { quantity: Anumber })
      .then((response) => console.log(response));
  };

  const handleDelete = async (product_id) => {
    await commerce.cart
      .remove(product_id)
      .then((response) => console.log(response));
  };

  const handleEmptyCart = async () => {
    await commerce.cart.empty().then((response) => console.log(response));
  };

  return (
    <>
      <BrowserRouter>
        <Appbar total={cartlist.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products
                fetchProducts={fetchProducts}
                handleAddToCart={handleAddToCart}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                fetchCart={fetchCart}
                handleUpdateCart={handleUpdateCart}
                handleEmptyCart={handleEmptyCart}
                handleDelete={handleDelete}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>

      {/* <Products  /> */}
    </>
  );
}

export default App;
