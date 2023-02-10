import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateFriend, deleteFriend, getMyFriends } from "../../store/friend"
import { authenticate } from "../../store/session"
function FriendIndividual(props) {
    const { friendship } = props
    const dispatch = useDispatch()
    const history = useHistory()
    async function deleteFriendship(id) {
       await dispatch(deleteFriend(id))
       await dispatch(getMyFriends())
        // dispatch(authenticate)
    }
    console.log("FRIEND in component", friendship)
    function messageRedirect(friendshipId) {
        history.push(`/messages/${friendshipId}`)
    }
    return (
        <div className="friend-item">
            <div className="friend-name">
                {friendship.otherName.slice(1)}
            </div>
            <div className="header" onClick={() => messageRedirect(friendship.id)}>
                message this user?
            </div>
            <div className="header" onClick={()=>deleteFriendship(friendship.id)}>
                Unfriend this user?
            </div>
        </div>
    )
}
export default FriendIndividual
