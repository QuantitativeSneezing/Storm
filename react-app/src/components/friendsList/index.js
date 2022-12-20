import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyFriends } from "../../store/friend"
function FriendsList() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyFriends())
    }, [])
    const friends = useSelector(state => state.friends.friendships)
    console.log("FRIENDS LIST FRIENDS", friends)
    if (friends){
        for (let i=0;i<friends.length;i++){
            console.log("logging in loop :",friends[i])
        }
    }
    return (
        <div className="friends-page">
            <div className='game-title'>Friends</div>
            {friends &&
                friends.map((friend) =>
                    <div className="friend-map" key={friend.id}>
                    </div>
                )}
        </div>
    )
}
export default FriendsList
