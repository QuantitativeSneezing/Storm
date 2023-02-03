import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { getFriendMessages } from "../../store/message"
import { getOneFriend } from "../../store/friend"
import messageBox from "../messageBox"
function MessagePage() {

    const dispatch = useDispatch()
    const { friendshipId } = useParams()
    useEffect(() => {
        dispatch(getFriendMessages(friendshipId))
        dispatch(getOneFriend(friendshipId))
    }, [])
    const messages = useSelector(state => state.messages.messages)
    return (
        <div>
            MESSAGE BOX GOES HERE
            {messages && messages.map((message) =>
                <div>
                    {message.content}
                </div>
            )}
        </div>
    )
}
export default MessagePage
