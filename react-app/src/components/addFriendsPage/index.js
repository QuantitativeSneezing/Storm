import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticate } from "../../store/session"
import { getMyFriends, newFriend } from "../../store/friend"
// import FriendIndividual from "../friendIndividual"
// import "./friendsList.css"
function AddFriendsList() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);
    useEffect(() => {
        dispatch(authenticate())
        dispatch(getMyFriends())
    }, [])
    const friends = useSelector(state => state.friends.friendships)
    const currentUser = useSelector(state => state.session.user)

    const notFriends = []
    const friendIds = []

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    // const friends = useSelector(state => state.friends.friendships)
    const user = useSelector(state => state.session.user)
    console.log("POTENTIAL FRIENDS LIST USERS", users)
    if (friends) {
        for (let i = 0; i < friends.length; i++) {
            // console.log(friends[i])
            // using the first index because each nickname is actually the user id at [0] followed
            // by the actual nickname lol
            if (+friends[i]?.nicknameOne[0] === user.id) {
                friends[i].otherName = friends[i].nicknameTwo
                friendIds.push(+friends[i].nicknameTwo[0])
            } else if (+friends[i]?.nicknameTwo[0] === user.id) {
                friends[i].otherName = friends[i].nicknameOne
                friendIds.push(+friends[i].nicknameOne[0])
            }
        }
    }

    if (friends && users && friendIds) {
        for (let i = 0; i < users.length; i++) {
            console.log(users[i])
            if (!friendIds.includes(users[i].id) && !(users[i].id === currentUser.id)) {
                notFriends.push(users[i])
            }
        }
    }
    console.log("DATA DUMP :", friends, users, friendIds)
    console.log("FRIEND IDS :", friendIds)
    console.log("NOT YOUR FRIENDS :", notFriends)
    function addNewFriend(id) {
        dispatch(newFriend(id))
        dispatch(getMyFriends())
    }

    return (
        <div className="friends-page">
            <div className='game-title'> Add Friends</div>
            {notFriends &&
                notFriends.map((user) =>
                    <div className="header" onClick={() => addNewFriend(user.id)}>
                        Add {user.username} as a friend?
                    </div>
                )}
            {!notFriends.length &&
                <div className="game-title">
                    No available users to friend
                </div>}
        </div>
    )
}
export default AddFriendsList
