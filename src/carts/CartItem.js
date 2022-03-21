import React from 'react';


function CartItem({cartitem, handleUpdateCart, handleDelete}) {
  // const item = itemProp;
  console.log(handleDelete)
  console.log(cartitem)
  return (
    <div class="card rounded-3 mb-4">
    <div class="card-body p-4">
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src={cartitem.image.url} alt={cartitem.name}
            class="img-fluid rounded-3"
          />
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <p class="lead fw-normal mb-2">{cartitem.name}</p>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button
            class="btn btn-link px-2"
             onClick= {()=> {handleUpdateCart(cartitem.id, cartitem.quantity-1)}}
          >
            <i class="fas fa-minus"></i>
          </button>

          <input
            id="form1"
            min="0"
            name="quantity"
            value={`${cartitem.quantity}`}
            type="number"
            class="form-control form-control-sm"
          />

          <button
            class="btn btn-link px-2"
            onClick={()=> {handleUpdateCart(cartitem.id, cartitem.quantity+1)}}
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 class="mb-0">{cartitem.line_total.formatted_with_symbol}</h5>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <button  class="btn btn-link text-danger" onClick={()=> handleDelete(cartitem.id)}>
            <i class="fas fa-trash fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartItem
  


  /*return (
    
  */

  // <div className="cart-item">
  //     <img className="cart-item__image"  />
  //     <div className="cart-item__details">
  //       <h4 className="cart-item__details-name"></h4>
  //       <div className="cart-item__details-qty">
  //         <button type="button" title="Reduce quantity" onClick={()=> handleUpdateCart(cartitem.id, cartitem.quantity-1)}>-</button>
  //         <p>{cartitem.quantity}</p>
  //         <button type="button" title="Increase quantity" onClick={()=> handleUpdateCart(cartitem.id, cartitem.quantity+1)}>+</button>
  //       </div>
  //       <div className="cart-item__details-price"></div>
  //     </div>
  //     <button type="button" onClick={()=>handleDelete(cartitem.id)}>Remove</button>
  //   </div>