import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart, removeFromCart, checkoutCart } from "../../store/cart";
function CartPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveCart())
    }, [dispatch])
    const cart = useSelector(state => state.cart.cart)
    console.log("CART IN CART PAGE :", cart)
    function removeCart(id){
        dispatch(removeFromCart(id))
    }
    return (
        <div className="cart-page">
            THIS IS THE CART AREA LOL
            <div className="cart-items">
                {cart && cart.map((game) =>
                    <div className="cart-item-area">{game.title}
                        <span className="cart-item-buttons">
                         <button onClick={()=>removeCart(game.id)}> REMOVE FROM CART?</button>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage
