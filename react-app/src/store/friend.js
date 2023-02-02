const ADD_FRIEND = 'friend/add'
const EDIT_FRIEND = "friend/edit"
const REMOVE_FRIEND = "friend/remove"
const LOAD_FRIENDS = "friend/get"
const LOAD_ONE= "friends/:friendshipId"
export const addFriend = (friendship) => {
    return {
        type: ADD_FRIEND,
        friendship
    };
};
export const loadOne = (friendship) => {
    return {
        type: LOAD_ONE,
        friendship
    }
}
export const getFriends = (friendships) => {
    return {
        type: LOAD_FRIENDS,
        friendships
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
        type: REMOVE_FRIEND,
        id
    };
};

export const getMyFriends = () => async dispatch => {
    const response = await fetch(`/api/friends/current`);
    if (response.ok) {
        const friends = await response.json();
        const result = dispatch(getFriends(friends.friendships))
        return result
    }
}
export const getOneFriend = (friendId) => async dispatch => {
    const response = await fetch(`/api/friends/${friendId}`);
    if (response.ok) {
        const friendship = await response.json();
        const done = dispatch(loadOne(friendship))
        return done
    }
}
export const newFriend = (friendId) => async dispatch => {
    const response = await fetch(`/api/friends/new/${friendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId }),
    })
    if (response.ok) {
        const friendship = await response.json();
        const done = dispatch(addFriend(friendship))
        return done
    }
}
export const updateFriend = (payload) => async dispatch => {
    const {nicknameOne, nicknameTwo, friendshipId}= payload
    const response = await fetch(`/api/friends/${friendshipId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicknameOne, nicknameTwo }),
    })
    if (response.ok) {
        const editedFriendship = await response.json();
        const done = dispatch(addFriend(editedFriendship))
        return done
    }
}
export const deleteFriend = (friendshipId) => async dispatch => {
    const response = await fetch(`/api/friends/${friendshipId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendshipId }),
    })
    if (response.ok) {
        const editedFriendship = await response.json();
        if (editedFriendship){
        const done = dispatch(removeFriend(friendshipId))
        return done
        }
    }
}
const friendReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FRIENDS:
            return { ...state, ...newState, friendships: [...action.friendships] };
        case LOAD_ONE:
            newState = { ...state, [action.friendship.id]: action.friendship }
            return newState
        case ADD_FRIEND:
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
            const newFriends = state.friendships.filter(friendship => friendship.id === action.friendshipId)
            newState = { ...state, friendships: newFriends }
            return newState;
        default:
            return state;
    }
};
export default friendReducer
