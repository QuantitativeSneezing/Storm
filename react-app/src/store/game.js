const LOAD_ONE = "games/:gameId"
const LOAD_ALL = 'games/all'
const ADD_CART = 'cart/add'
const CHECKOUT = "cart/checkout"
const REMOVE_CART = "card/remove"

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




const gameReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        //separate loads for regular and dm games
        case LOAD_ALL:
            // if there is a game already, skip this and go straight to overwriting it
            if (!state[action.game.id]) {
                newState = {
                    ...state,
                    [action.game.id]: action.game
                };
                const gameList = newState.games.map(id => newState[id]);
                gameList.push(action.game);
                newState.games = gameList;

                return newState;
            }
            return {
                ...state,
            };

        case DELETE_GAME:
            const newGames = state.games.filter(game => game.id === action.gameId)
            newState = { ...state, games: newGames }
            return newState;
        default:
            return state;
    }
};
export default gameReducer
