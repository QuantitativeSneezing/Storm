import "./gameDisplay.css"
import { useHistory } from "react-router-dom"
function GameDisplayItem(game) {
    const history= useHistory()
    game= game.game
    function storePageRedirect(){
        history.push(`/app/${game.id}`)
    }
    console.log ("game from display item :",game)
    const splashPhoto= game.images[0].url
    // console.log("splash :", splashPhoto)
    return (
        <div className="game-container" >
            <div className=""></div>
            <img src={splashPhoto} className= "game-store-picture" onClick={storePageRedirect}></img>
            <div className="game-price">
                {game.price}

            </div>
        </div>
    )
}
export default GameDisplayItem
