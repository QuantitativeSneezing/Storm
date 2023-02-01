import React, { useState, useEffect } from "react"

function MessageBox(friend) {
    const [content, setContent] = useState("")
    return (

        <input className="dm-text-input"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Send a message ${friend.nickName}`}
        />
    )
}
export default MessageBox
