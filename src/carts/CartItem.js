import React from 'react';


function CartItem({cartitem, handleUpdateCart, handleDelete}) {
  // const item = itemProp;
  // console.log(handleDelete)
  // console.log(cartitem)
  return (
    <div className="card rounded-3 mb-4">
    <div className="card-body p-4">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-2 col-lg-2 col-xl-2">
          <img
            src={cartitem.image.url} alt={cartitem.name}
            className="img-fluid rounded-3"
          />
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <p className="lead fw-normal mb-2">{cartitem.name}</p>
        </div>
        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button
            className="btn btn-link px-2"
             onClick= {()=> {handleUpdateCart(cartitem.id, cartitem.quantity-1)}}
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className='alignName-content-center'>
          {`${cartitem.quantity}`}
          </div>

          <button
            className="btn btn-link px-2"
            onClick={()=> {handleUpdateCart(cartitem.id, cartitem.quantity+1)}}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 className="mb-0">{cartitem.line_total.formatted_with_symbol}</h5>
        </div>
        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
          <button  className="btn btn-link text-danger" onClick={()=> handleDelete(cartitem.id)}>
            <i className="fas fa-trash fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartItem
  
