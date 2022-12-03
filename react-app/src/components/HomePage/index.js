import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GamesBox from "../gamesBox";
import { getAllGames } from "../../store/game";
import { authenticate } from "../../store/session";
function HomePage() {
    const dispatch = useDispatch();
    const [gamesLoaded, setGamesLoaded] = useState(false)
    const games = useSelector(state => state.games.games)
    const user= useSelector(state=>state.session.user)
    useEffect(() => {
        dispatch(getAllGames())
        if(user){
            dispatch(authenticate())
        }
        setGamesLoaded(true)
    }, [dispatch])
    // console.log("HOMEPAGE GAMES :", games)
    return (
        <div className="home-page">
            <div className="store-header">

            </div>
            {
                gamesLoaded &&
                <GamesBox games = {games} owned={false}/>
            }
        </div>
    )
}
export default HomePage
