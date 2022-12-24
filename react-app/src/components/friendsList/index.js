import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyFriends } from "../../store/friend"
import { authenticate } from "../../store/session"
import FriendIndividual from "../friendIndividual"
function FriendsList() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyFriends())
        dispatch(authenticate())
    }, [])
    const friends = useSelector(state => state.friends.friendships)
    const user = useSelector(state => state.session.user)
    console.log("FRIENDS LIST FRIENDS", friends)
    if (friends) {
        for (let i = 0; i < friends.length; i++) {
            if (+friends[i].nicknameOne[0] === user.id) {
                friends[i].otherName= friends[i].nicknameTwo
                    }else if (+friends[i].nicknameTwo[0]===user.id){
                        friends[i].otherName= friends[i].nicknameOne
                }
            }
        }
        return (
            <div className="friends-page">
                <div className='game-title'>Friends</div>
                {friends &&
                    friends.map((friend) =>
                        <div className="friend-map" key={friend.id}>
                            <FriendIndividual friendship={friend}></FriendIndividual>
                        </div>
                    )}
            </div>
        )
    }
    export default FriendsList
