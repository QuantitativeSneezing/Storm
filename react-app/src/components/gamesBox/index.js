import GameDisplayItem from "../gameDisplayItem"
import "./gamesBox.css"
function GamesBox(games) {
    console.log("GAMES IN GAMESBOX: ", games)
    games = games.games
    return (
        <div className="game-box">
            {games &&
                games.map((game) =>
                    <div className="game-map">
                        <GameDisplayItem game={game}></GameDisplayItem>
                    </div>
                )}
        </div>
    )
}
export default GamesBox
