import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./component/Appbar";
import { commerce } from "./lib/commerce";
import Products from "./Products/products";
import Cart from "./carts/Cart";
import Checkout from "./Checkout/Checkout";

function App() {
  const [cartlist, setCartlist] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchCart() {
    await commerce.cart
      .retrieve()
      .then((cart) => {
        setCartlist(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
        // console.log(cartlist);
      });
  }

  const fetchProducts = async () => {
    const data = await commerce.products.list();
    // console.log(data);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    // console.log(products);
  }, []);

  // console.log(cartlist);

  const handleAddToCart = async (productId, quantity) => {
    await commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCartlist(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
    console.log("I added a new product", cartlist);
  };

  const handleUpdateCart = async (cart_id, quantity) => {
    await commerce.cart
      .update(cart_id, { quantity })
      .then((response) => setCartlist(response.cart));
  };

  const handleDelete = async (product_id) => {
    await commerce.cart
      .remove(product_id)
      .then((response) => setCartlist(response.cart));
  };

  const handleEmptyCart = async () => {
    const newcart = await commerce.cart.refresh();
    setCartlist(newcart);
    // await commerce.cart.empty().then((response) => setCartlist(response.cart));
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      // console.log(incomingOrder);
      setOrder(incomingOrder);
      // console.log(order);
      handleEmptyCart();
      
    } catch (error) {
      setErrorMessage(error.data);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Appbar total={cartlist.total_items} />
        {loading ? (
          <div className=" d-flex justify-content-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Products
                  myproducts={products}
                  // fetchProducts={fetchProducts}
                  handleAddToCart={handleAddToCart}
                />
              }
            ></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  // fetchCart={fetchCart}
                  cartlist={cartlist}
                  handleUpdateCart={handleUpdateCart}
                  handleEmptyCart={handleEmptyCart}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartlist={cartlist}
                  handleCaptureCheckout={handleCaptureCheckout}
                  order={order}
                  errorMessage={errorMessage}
                />
              }
            />
          </Routes>
        )}
      </BrowserRouter>

      {/* <Products  /> */}
    </>
  );
}

export default App;
