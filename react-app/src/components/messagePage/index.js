import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import React, { useEffect, useReducer } from "react"
import { getFriendMessages } from "../../store/message"
import { getOneFriend } from "../../store/friend"
import MessageBox from "../messageBox"
function MessagePage() {

    const dispatch = useDispatch()
    const { friendshipId } = useParams()
    useEffect(() => {
        dispatch(getFriendMessages(friendshipId))
        dispatch(getOneFriend(friendshipId))
    }, [])
    const messages = useSelector(state => state.messages.messages)
    const friends= useSelector(state=> state.friends[friendshipId])
    const user = useSelector(state => state.session.user)
    console.log ("CHECK FRIENDSHIP DATA :", friends)
    let deliveredFriend;
    let deliveredUser;
    if (friends){
        // console.log("FIRST FRIEND :",friends.friends[0].id===user.id)
    }
    return (
        <div>
            Messages between {
                friends && <div> <span> {friends.nicknameOne.slice(1)} </span> and <span> {friends.nicknameTwo.slice(1)}</span> </div>
            }
            {messages && messages.map((message) =>
                <div>
                    {message.content}
                </div>
            )}
            <MessageBox/>
        </div>
    )
}
export default MessagePage
