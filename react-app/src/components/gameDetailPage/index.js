import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneGame } from "../../store/game";
import ReviewList from "../reviewList"
import { addToCart, retrieveCart } from "../../store/cart";
import { authenticate } from "../../store/session";
import "./gameDetailPage.css"
function GameDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { gameId } = useParams();

    useEffect(() => {
        dispatch(retrieveCart())
        dispatch(authenticate())
        dispatch(getOneGame(gameId))
    }, [dispatch, gameId])

    const stateGames = useSelector(state => state.games)

    const cart = useSelector(state => state.cart.cart)
    const user = useSelector(state => state.session.user)
    let notInCartAlready;
    let ownedByUser = false;
    // console.log("USE SELECTORS :",user, cart)

    let currentGame;
    if (stateGames) {
        currentGame = stateGames[gameId]
        if (cart) {
            const gameFromCart = cart.find(game => game.id === +gameId)
            // console.log("IN THE CART ? :", gameFromCart)
            if (!gameFromCart) {
                notInCartAlready = true
            }
        }
        if (user) {
            // console.log("USER'S GAMES :", user.games)
            const gameInLibrary = user.games.find(game => game.id === +gameId)
            // console.log("IN LIBRARY ?:",gameInLibrary)
            if (gameInLibrary) {
                ownedByUser = true
            }
        }
    }

    console.log("GAME IN GAME DETAILS", currentGame)
    function addGameToCart() {
        console.log("GAME TO BE ADDED :", currentGame.id)
        dispatch(addToCart(currentGame.id))
        // dispatch(authenticate())
        // dispatch(getOneGame(gameId))
        // dispatch(retrieveCart())

        // history.push('/')

    }

    function alreadyInCart() {
        history.push('/cart')
    }

    return (
        <div className="game-detail-container">
            {
                currentGame && (
                    <div className="game-main-container">
                        <div className="game-title">{currentGame.title}</div>
                        <div className="game-images-container">
                            <img src={currentGame.images[0].url} alt="I lifted these all from steam lol"></img>
                            {currentGame.description}
                        </div>
                        {/* <div className="game-price">{currentGame.price}</div> */}
                        {user && notInCartAlready && !ownedByUser &&
                            <div className="buy-item-container">
                                <div className="game-buy-title">Buy {currentGame.title} </div>
                                <span className="cart-button" onClick={addGameToCart}>Add to Cart</span>
                            </div>
                        }
                        {user && !notInCartAlready && !ownedByUser &&
                            <div className="cart-button" onClick={alreadyInCart}>In Cart</div>
                        }
                        <div className="game-review-area">
                            <ReviewList reviews={currentGame.reviews} owned={ownedByUser} game={currentGame} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default GameDetailPage
