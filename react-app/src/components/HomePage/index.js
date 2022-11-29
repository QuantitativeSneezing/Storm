import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GamesBox from "../gamesBox";
import { getAllGames } from "../../store/game";
function HomePage() {
    const dispatch = useDispatch();
    const [gamesLoaded, setGamesLoaded] = useState(false)
    useEffect(() => {
        dispatch(getAllGames())
        setGamesLoaded(true)
    }, [dispatch])
    const games = useSelector(state => state.games.games)
    console.log("HOMEPAGE GAMES :", games)
    return (
        <div className="home-page">
            <div> HELLO THIS IS THE HOMEPAGE</div>
            {
                gamesLoaded &&
                <GamesBox games = {games} owned={false}/>
            }
        </div>
    )
}
export default HomePage
