import React from "react";

function Review({ checkoutToken }) {
  return (
    <>
      <div class="col-md-6">
        <div class="card border-1 ">
          <div class="card-header card-2">
            <p class="card-text text-muted mt-md-4 mb-2 space">
              ORDER SUMMARY{" "}
            </p>
            <hr class="my-2" />
          </div>
          <div class="card-body pt-5">
            <div class="row justify-content-between"></div>
            {checkoutToken.live.line_items.map((product) => {
              return (
                <div class="row justify-content-between pb-5">
                  <div class="col-auto col-md-7">
                    <div class="media flex-column flex-sm-row">
                      {" "}
                      <img
                        class=" img-fluid"
                        src={product.image.url}
                        width="62"
                        height="62"
                        alt="product"
                      />
                      <div class="media-body my-auto">
                        <div class="row ">
                          <div class="col-auto">
                            <p class="mb-0">
                              <b>{product.name}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" pl-0 flex-sm-col col-auto my-auto">
                    <p class="boxed-1">{product.quantity}</p>
                  </div>
                  <div class=" pl-0 flex-sm-col col-auto my-auto ">
                    <p>
                      <b> {product.line_total.formatted_with_symbol}</b>
                    </p>
                  </div>
                </div>
              );
            })}

            <div class="row justify-content-between">
              <div class="col-4">
                <p>
                  <h4>Total</h4>
                </p>
              </div>

              <div class="flex-sm-col col-auto">
                <p class="mb-1">
                  <h4 className="font-weight-600">
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                  </h4>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
