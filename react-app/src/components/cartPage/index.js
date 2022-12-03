import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCart, removeFromCart, checkoutCart } from "../../store/cart";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";
import "./cartPage.css"
function CartPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [retrieved, setRetrieved] = useState(false)
    useEffect(() => {
        dispatch(retrieveCart())
        dispatch(authenticate()).then(
            setRetrieved(true)
        )
    }, [dispatch])

    const cart = useSelector(state => state.cart.cart)

    // console.log("CART IN CART PAGE :", cart)

    function removeCart(id) {
        dispatch(removeFromCart(id))

    }

    function buyAll() {
        dispatch(checkoutCart())

            2(authenticate())
        history.push('/')
    }

    function returnToShopping() {
        history.push('/')
    }
    return (
        <>
            {retrieved &&
                <div className="cart-page">
                    <div className="cart-items">
                        {cart && cart.map((game) =>
                            <div className="cart-item-area">{game.title}
                                <span className="cart-item-buttons">
                                    <button onClick={() => removeCart(game.id)}> REMOVE FROM CART?</button>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="checkout" onClick={buyAll}>
                        Checkout
                    </div>
                    <div className="return-to-store" onClick={returnToShopping}>
                        CONTINUE SHOPPING?????
                    </div>
                </div>
            }
        </>
    )
}

export default CartPage
