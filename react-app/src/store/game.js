const LOAD_ONE = "games/:gameId"
const LOAD_ALL = 'games/all'


// export const addCart = (game) => {
//     return {
//         type: ADD_CART,
//         game
//     };
// };
export const loadOne = (game) => {
    return {
        type: LOAD_ONE,
        game
    }
}
export const loadAll = (games) => {
    return {
        type: LOAD_ALL,
        games
    }
}

export const getAllGames = () => async dispatch => {
    const response = await fetch(`/api/games/all`);
    if (response.ok) {
        const games = await response.json();
        console.log("THUNK GAMES :", games)
        const result = dispatch(loadAll(games.games))
        //console.log("RESULT OF DISPATCHING :", result)
        return result
    }
};
export const getOneGame = (gameId) => async dispatch => {
    const response = await fetch(`/api/games/${gameId}`);
    if (response.ok) {
        const games = await response.json();
        console.log("THUNK GAMES :", games)
        const result = dispatch(loadOne(games.game))
        //console.log("RESULT OF DISPATCHING :", result)
        return result
    }
};
export const getLibraryGames = () => async dispatch => {
    const response = await fetch(`/api/games/library`);
    if (response.ok) {
        const games = await response.json();
        console.log("THUNK GAMES :", games)
        const result = dispatch(loadAll(games.games))
        //console.log("RESULT OF DISPATCHING :", result)
        return result
    }
};

const gameReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, ...newState, games: [...action.games] };
        case LOAD_ONE:
            newState = { ...state, [action.game.id]: action.game }
            return newState
        // case DELETE_GAME:
        //     const newGames = state.games.filter(game => game.id === action.gameId)
        //     newState = { ...state, games: newGames }
        //     return newState;
        default:
            return state;
    }
};
export default gameReducer
