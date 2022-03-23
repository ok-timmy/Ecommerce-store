import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import React from "react";

const stripepromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function PaymentForm({
  checkoutToken,
  shippingData,
  backStep,
  handleCaptureCheckout,
  nextStep,
}) {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(shippingData)
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "primary",
          street: shippingData.address1,
          town_city: shippingData.City,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.ZIP,
          country: shippingData.shippingCountry,
        },
        fufillment: { shipping_method: [shippingData.shippingOption] },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
      // console.log(orderData);
      nextStep();
      // console.log(shippingData)
    }
  };
  // console.log((shippingData))

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "red",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "red"
        },
        "::placeholder": {
          color: "#87bbfd"
        }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

  return (
    <><div className="col-md-12 order-md-1 m-auto">
      <div className="d-flex justify-content-center">

      <Review checkoutToken={checkoutToken} />
      </div>
      <br/>
      <div className="d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card border-1 ">
      <h3 className='my-2'>
        Payment Methods
      </h3>
      <Elements stripe={stripepromise} >
        <ElementsConsumer>
          {({ elements, stripe }) => {
            return (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <div class="card-body pt-5"><CardElement options={CARD_OPTIONS} /></div>
                <br /> <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button type="button" class="btn btn-outlined" onClick={backStep}>Back </button>
                  <button type="submit" class="btn btn-primary">
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </button>
                </div>
               
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default PaymentForm;

