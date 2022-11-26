const ADD_CART = 'cart/add'
const CHECKOUT = "cart/checkout"
const REMOVE_CART = "card/remove"

export const addCart = (game) => {
    return {
        type: ADD_CART,
        game
    };
};

export const checkout = (cart) => {
    return {
        type: LOAD_ALL,
        cart
    }
}
export const removeCart = (id) => {
    return {
        type: DELETE_GAME,
        id
    };
};

export const addToCart = (id) => async dispatch=>{
    const response = await fetch(`/api/games/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
    })
    if (response.ok) {
        const newCartGame = await response.json();
        const done =dispatch(addToCart(response))
        return done
    }
}
export const cbeckoutCart = () => async dispatch=>{
    const response = await fetch(`/api/games/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
    })
    if (response.ok) {
        const newCartGame = await response.json();
        const done =dispatch(addToCart(response))
        return done
    }
}

const cartReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_CART:
            // First case should technically never happen but I like these to be consistent
            if (!state[action.game.id]) {
                newState = {
                    ...state,
                    [action.game.id]: action.game
                };
                const gameList = newState.cart.map(id => newState[id]);
                gameList.push(action.game);
                newState.cart = gameList;

                return newState;
            }
            return {
                ...state,
            };
        case CHECKOUT:
            const emptyCart= {}
            newState = { ...state, cart: emptyCart }
            return newState
        case REMOVE_CART:
            const newCart = state.cart.filter(game => game.id === action.gameId)
            newState = { ...state, cart: newCart }
            return newState;
        default:
            return state;
    }
};
export default cartReducer
