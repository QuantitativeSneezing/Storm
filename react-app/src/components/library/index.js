import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import GameDisplayItem from "../gameDisplayItem";
import { getLibraryGames } from "../../store/game";
function Library() {
    const dispatch = useDispatch();
    const [gamesLoaded, setGamesLoaded] = useState(false)
    useEffect(() => {
        dispatch(getLibraryGames())
        setGamesLoaded(true)
    }, [dispatch])
    const games = useSelector(state => state.games.games)
    console.log(games)
    return (
        <div className="game-box">
            {gamesLoaded && games &&
                games.map((game) =>
                    <div className="game-map">
                        <GameDisplayItem game={game} owned={true}></GameDisplayItem>
                    </div>
                )}
        </div>
    )
}
export default Library
