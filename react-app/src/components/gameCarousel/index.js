import { useState } from "react"
import { useHistory } from "react-router-dom"
function GameCarousel(games) {
    games = games.games
    const history = useHistory()
    const [currentGameLocation, setCurrentGameLocation] = useState(0)
    function incrementLocation() {
        if (currentGameLocation >= games.length - 1) {
            setCurrentGameLocation(0)
        } else {
            setCurrentGameLocation(currentGameLocation + 1)
        }
    }
    function decrementLocation() {
        if (currentGameLocation == 0) {
            setCurrentGameLocation(games.length - 1)
        } else {
            setCurrentGameLocation(currentGameLocation - 1)
        }
    }
    let currentImage;
    if (games) {
        if (games[currentGameLocation].images) {
            currentImage = games[currentGameLocation].images[0].url
        }
    }
    // console.log("CURR IMAGE", currentImage)
    function storePageRedirect() {
        history.push(`/app/${games[currentGameLocation].id}`)
    }
    return (
        <div className="carousel">
            {/* {games && games[currentGameLocation].title} */}
            <img src={currentImage} className="game-carousel-picture" onClick={storePageRedirect} alt="lifted straight from steam hosting lol"></img>
            <div className="carousel-buttons">
                <span className="menu-button" onClick={incrementLocation}> Next game</span>
                <span className="menu-button" onClick={decrementLocation}> Prev game</spand>
            </div>

        </div >
    )
}
export default GameCarousel
