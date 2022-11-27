import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart, removeFromCart, checkoutCart } from "../../store/cart";
import { useHistory } from "react-router-dom";
function CartPage() {
    const dispatch = useDispatch();
    const history= useHistory();
    useEffect(() => {
        dispatch(retrieveCart())
    }, [dispatch])

    const cart = useSelector(state => state.cart.cart)

    console.log("CART IN CART PAGE :", cart)

    function removeCart(id){
        dispatch(removeFromCart(id))
    }

    function buyAll(){
        dispatch(checkoutCart())
        history.push('/library')
    }

    function returnToShopping(){
        history.push('/')
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
            <div className="checkout" onClick={buyAll}>
                BUY THESE GAMES????
            </div>
            <div className="return-to-store" onClick={returnToShopping}>
                CONTINUE SHOPPING?????
            </div>
        </div>
    )
}

export default CartPage
