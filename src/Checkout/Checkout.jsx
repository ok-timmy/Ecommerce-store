import React, { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cartlist, handleCaptureCheckout, order, errorMessage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  // console.log(order)

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartlist.id, {
          type: "cart",
        });
        // console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [order]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
    // console.log(handleCaptureCheckout)
  };
  // console.log(checkoutToken);
  let Confirmation = ({ order }) => {
    // console.log(order)
    return (
      <>
        <div className="col-md-6 order-md-1 m-auto card">
          <div className=" align-items-center p-5">
            <h3>Thank You For Your purchase</h3>
            <div>
              <Link to={"/"}>
                <button type="button" class="btn btn-outlined">
                  Back To Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <div>
        <main>
          <div className="d-flex justify-content-center">
            <h2 className=" mt-3 mb-3 text-align-center"> Checkout</h2>
          </div>
          <div className="d-flex justify-content-center">
            {activeStep === steps.length ? (
              <Confirmation order={order} />
            ) : (
              checkoutToken && <Form />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
