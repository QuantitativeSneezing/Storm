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
    const user = useSelector(state => state.session.user)
    let enableCart;
    let totalCost= 0
    if (cart && cart.length) {
        enableCart = true
        // for (let i=0;)
    }
    // console.log("CART IN CART PAGE :", cart)

    function removeCart(id) {
        dispatch(removeFromCart(id))
        dispatch(authenticate())
    }

    function buyAll() {
        dispatch(checkoutCart())

        dispatch(authenticate())
        history.push('/done')
    }

    function returnToShopping() {
        history.push('/')
    }
    return (
        <>
            {retrieved &&
                <div className="cart-page">
                    <div className="game-title" style={{"margin-left": "18%"}}>{user.username}'s Cart </div>
                    <div className="spacer" style={{"margin-bottom": "25px"}}></div>
                    <div className="cart-items">
                        {cart && cart.map((game) =>
                            <div className="cart-item-area">{game.title}
                                <img src={game.images[0].url} alt="still from steam" className="small-image" onClick={()=>history.push(`/app/${game.id}`)}></img>
                                ${game.price}
                                <span className="cart-item-buttons">
                                    <button onClick={() => removeCart(game.id)} className="small-button"> Remove </button>
                                </span>
                            </div>
                        )}
                    </div>
                    {enableCart &&
                        <div className="cart-button-checkout" onClick={buyAll}>
                            Checkout
                        </div>
                    }
                    <div className="cart-button-checkout" onClick={returnToShopping}>
                        Continue Shopping
                    </div>
                </div>
            }
        </>
    )
}

export default CartPage
