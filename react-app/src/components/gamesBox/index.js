import GameDisplayItem from "../gameDisplayItem"
import "./gamesBox.css"
import { useHistory } from "react-router-dom"
function GamesBox(games) {
    const history= useHistory()
    // console.log("GAMES IN GAMESBOX: ", games)
    games = games.games
    return (
        <div className="game-box">
            {games &&
                games.map((game) =>
                    <div className="game-map" key={game.id}>
                        <GameDisplayItem game={game}></GameDisplayItem>
                        <span className="cart-button" onClick= {()=>history.push(`/app/${game.id}`)}>{game.price} </span>
                    </div>
                )}
        </div>
    )
}
export default GamesBox
