import "./gameDisplay.css"
function GameDisplayItem(game) {
    game= game.game
    console.log ("game from display item :",game)
    const splashPhoto= game.images[0].url
    // console.log("splash :", splashPhoto)
    return (
        <div className="game-container">
            <div className=""></div>
            <img src={splashPhoto} className= "game-store-picture"></img>
            <div className="game-price">
                {game.price}
            </div>
        </div>
    )
}
export default GameDisplayItem
