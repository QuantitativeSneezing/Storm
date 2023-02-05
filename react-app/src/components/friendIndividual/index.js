import { useHistory } from "react-router-dom"
import { updateFriend, deleteFriend } from "../../store/friend"
function FriendIndividual(props) {
    const { friendship } = props
    const history = useHistory()
    console.log("FRIEND in component", friendship)
    function messageRedirect(friendshipId){
        history.push(`/messages/${friendshipId}`)
    }
    return (
        <div className="friend-item">
            <div className="friend-name">
                {friendship.otherName.slice(1)}
            </div>
            <div className="header" onClick={()=>messageRedirect(friendship.id)}>
                message this user?
            </div>
            <div className="header" onClick={()=>console.log("HELLO")}>
                Change this user's nickname?
            </div>
            <div className="header" onClick={()=>deleteFriend(friendship.id)}>
                Unfriend this user?
            </div>
        </div>
    )
}
export default FriendIndividual
