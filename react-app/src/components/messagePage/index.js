import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { getFriendMessages } from "../../store/message"
import messageBox from "../messageBox"
function MessagePage() {

    const dispatch= useDispatch()
    const {friendshipId}= useParams()
    useEffect(() => {
        dispatch(getFriendMessages(friendshipId))
    }, [])
    const messages= useSelector(state=>state)
    console.log("MESSAGES IN BOX:", messages)
    return (
        <div>
            THIS IS A BOX WHICH WILL CONTAIN MESSAGES
        </div>
    )
}
export default MessagePage
