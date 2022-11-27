const ADD_FRIEND = 'friend/add'
const EDIT_FRIEND = "friend/edit"
const REMOVE_FRIEND = "card/remove"

export const addFriend = (friendship) => {
    return {
        type: ADD_FRIEND,
        friendship
    };
};

export const editFriend = (friendship) => {
    return {
        type: EDIT_FRIEND,
        friendship
    }
}
export const removeFriend = (id) => {
    return {
        type: DELETE_FRIEND,
        id
    };
};


export const newFriend = (friendId) => async dispatch=>{
    const response = await fetch(`/api/friends/new/${friendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({friendId}),
    })
    if (response.ok) {
        const friendship = await response.json();
        const done = dispatch(addFriend(friendship))
        return done
    }
}

const friendReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_FRIEND:
            // First case should technically never happen but I like these to be consistent
            if (!state[action.friendship.id]) {
                newState = {
                    ...state,
                    [action.friendship.id]: action.friendship
                };
                const friendshipList = newState.friendships.map(id => newState[id]);
                friendshipList.push(action.friendship);
                newState.friendships = friendshipList;

                return newState;
            }
            return {
                ...state,
            };
        case REMOVE_FRIEND:
            const newFriend = state.friendships.filter(friendship => friendship.id === action.friendshipId)
            newState = { ...state, friendships: newFriend }
            return newState;
        default:
            return state;
    }
};
export default friendReducer
