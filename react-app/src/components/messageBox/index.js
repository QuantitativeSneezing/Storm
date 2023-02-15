import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { useDispatch } from "react-redux"
import { addOneMessage, getFriendMessages} from "../../store/message"
function MessageBox(friend, user) {
    const [content, setContent] = useState("")
    const dispatch= useDispatch()
    const { friendshipId } = useParams()
    async function handleSubmit(){
        dispatch(addOneMessage({friendshipId, content}))
        dispatch(getFriendMessages(friendshipId))
    }
    const otherUser= "Dave"
    return (

        <form className="create-dm-msg-form" onSubmit={handleSubmit}>
            <input className="dm-text-input"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Send message`}
            />
            <div className="dm-s-icon-div"  onClick={handleSubmit}>
               SEND MESSAGE? <i className="fa-solid fa-paper-plane"></i>
            </div>
        </form>
    )
}
export default MessageBox
