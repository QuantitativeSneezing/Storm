import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneGame } from "../../store/game";
function GameDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { gameId } = useParams();
    useEffect(() => {
        dispatch(getOneGame(gameId))
    }, [])
    const stateGames = useSelector(state => state.games)
    let currentGame;
    if (stateGames) {
        currentGame = stateGames[gameId]
    }
    console.log("GAME IN GAME DETAILS", currentGame)
    return (
        <div className="game-detail-container">

            {
                currentGame && (
                    <div className="game-main-container">
                        <div className="game-title">{currentGame.title}</div>
                        <div className="game-images-container">
                            <img src={currentGame.images[0].url}></img>
                        </div>
                        <div className="game-price">{currentGame.price}</div>
                    </div>
                )
            }
        </div>
    )
}
export default GameDetailPage
