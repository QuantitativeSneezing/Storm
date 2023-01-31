import React, { useState, useEffect } from "react"

function MessageBox(friend) {
    return (

        <input className="dm-text-input"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Send a message ${friend.nickName}`}
        />
    )
}
export default MessageBox()
