const ADD_CART = 'cart/add'
const CHECKOUT = "cart/checkout"
const REMOVE_CART = "cart/remove"
const GET_CART = 'cart/get'
export const addCart = (game) => {
    return {
        type: ADD_CART,
        game
    };
};

export const getCart = (games) => {
    return {
        type: GET_CART,
        games
    };
};
export const checkout = (cart) => {
    return {
        type: CHECKOUT,
        cart
    }
}
export const removeCart = (id) => {
    return {
        type: REMOVE_CART,
        id
    };
};
export const retrieveCart= () => async dispatch =>{
    const response= await fetch (`/api/games/cart`)
    if (response.ok) {
        const cart= await response.json();
        const done = dispatch(getCart(cart))
        return done
    }
}
export const addToCart = (id) => async dispatch=>{
    console.log ("ID IN ADD TO CART THUNK :", id)
    const response = await fetch(`/api/games/cart/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
    })
    if (response.ok) {
        const newCartGame = await response.json();
        const done = dispatch(addToCart(newCartGame))
        return done
    }
}
export const checkoutCart = () => async dispatch=>{
    const response = await fetch(`/api/games/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify("ADDING"),
    })
    if (response.ok) {
        const results = await response.json();
        const done = dispatch(checkout(results))
        return done
    }
}
export const removeFromCart = (gameId) => async dispatch=>{
    const response = await fetch(`/api/games/cart/${gameId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({gameId}),
    })
    if (response.ok) {
        const finished = await response.json();
        if(!finished){
            return
        }
        const done = dispatch(removeCart(gameId))
        return done
    }
}

const cartReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_CART:
            console.log("ACTION IN GET CART :", action)
            // return {...state}
            return { ...state, ...newState, cart: [...action.games.cart] };
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
            const emptyCart= []
            newState = { ...state, cart: emptyCart }
            return newState
        case REMOVE_CART:

            // for (let i=0;i<state.cart.length;i++){
            //     console.log("IN CART ???? :", state.cart[i].id==action.id, state.cart[i])
            // }
            const newCart = state.cart.filter(game => game.id !== action.id)
            newState = { ...state, cart: newCart }
            // console.log("NEW CART IN DELETE THUNK :",newCart )
            // console.log("CART IN DELETE THUNK :",action)
            // console.log("STATE IN DELETE THUNK :", state)
            // console.log ("NEW STATE :", newState)
            // newState= {...state}
            return newState;
        default:
            return state;
    }
};
export default cartReducer
