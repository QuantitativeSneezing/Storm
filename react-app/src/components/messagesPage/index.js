import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { getFriendMessages } from "../../store/message"
function MessagePage() {
    const {friendshipId}= useParams()
    useEffect(() => {

    }, [])
    return (
        <div>
            THIS IS A BOX WHICH WILL CONTAIN MESSAGES
        </div>
    )
}
export default MessagePage
