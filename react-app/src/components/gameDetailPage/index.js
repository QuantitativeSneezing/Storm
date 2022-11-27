import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneGame } from "../../store/game";
import ReviewList from "../reviewList"
import { addToCart } from "../../store/cart";
function GameDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { gameId } = useParams();
    useEffect(() => {
        dispatch(getOneGame(gameId))
    }, [dispatch, gameId])
    const stateGames = useSelector(state => state.games)
    const user = useSelector(state => state.session.user)
    console.log(user)
    let currentGame;
    if (stateGames) {
        currentGame = stateGames[gameId]
    }
    console.log("GAME IN GAME DETAILS", currentGame)
    function addGameToCart() {
        const added = dispatch(addToCart(currentGame.id))
        console.log(added)
        history.push('/')
    }
    return (
        <div className="game-detail-container">

            {
                currentGame && (
                    <div className="game-main-container">
                        <div className="game-title">{currentGame.title}</div>
                        <div className="game-images-container">
                            <img src={currentGame.images[0].url} alt="I lifted these all from steam lol"></img>
                        </div>
                        <div className="game-price">{currentGame.price}</div>
                        {user &&
                            <div className="cart-button" onClick={addGameToCart}>ADD TO CART?</div>
                        }
                        <div className="game-review-area">
                            <div>
                                REVIEWS FOR THIS GAME:
                            </div>
                            <ReviewList reviews={currentGame.reviews} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default GameDetailPage
