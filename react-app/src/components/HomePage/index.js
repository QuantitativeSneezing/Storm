import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GamesBox from "../gamesBox";
import { getAllGames } from "../../store/game";
import { authenticate } from "../../store/session";
import "./HomePage.css"
function HomePage() {
    const dispatch = useDispatch();
    const [gamesLoaded, setGamesLoaded] = useState(false)
    const games = useSelector(state => state.games.games)
    useEffect(() => {
        dispatch(getAllGames())

        dispatch(authenticate())

        setGamesLoaded(true)
    }, [dispatch])
    // console.log("HOMEPAGE GAMES :", games)
    return (
        <div className="home-page">
            <div className="game-title">Welcome to Storm! Please browse from the following games:</div>
            <div className="store-header">

            </div>
            {
                gamesLoaded &&
                <GamesBox games={games} owned={false} />
            }
        </div>
    )
}
export default HomePage
