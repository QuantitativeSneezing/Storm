import "./gameDisplay.css"
import { useHistory } from "react-router-dom"
function GameDisplayItem(props) {
    const history = useHistory()
    const { game, inLibrary } = props
    function storePageRedirect() {
        if (!inLibrary) {
            history.push(`/app/${game.id}`)
        }
    }
    // console.log("game from display item :", game)
    const splashPhoto = game.images[0].url
    // console.log("splash :", splashPhoto)
    return (
        <div className="game-container" >
            <div className="image-holder">

                <img src={splashPhoto} className="game-store-picture" onClick={storePageRedirect} alt="lifted straight from steam hosting lol"></img>
            </div>

        </div>
    )
}
export default GameDisplayItem
