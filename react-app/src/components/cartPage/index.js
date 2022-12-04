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
    let enableCart;
    if (cart&& cart.length) {
        enableCart=true
    }
    // console.log("CART IN CART PAGE :", cart)

    function removeCart(id) {
        dispatch(removeFromCart(id))
        dispatch(authenticate())
    }

    function buyAll() {
        dispatch(checkoutCart())

        dispatch(authenticate())
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
                                    <button onClick={() => removeCart(game.id)}> Remove </button>
                                </span>
                            </div>
                        )}
                    </div>
                    {enableCart &&
                    <div className="cart-button" onClick={buyAll}>
                        Checkout
                    </div>
                    }
                    <div className="cart-button" onClick={returnToShopping}>
                        Continue Shopping
                    </div>
                </div>
            }
        </>
    )
}

export default CartPage
