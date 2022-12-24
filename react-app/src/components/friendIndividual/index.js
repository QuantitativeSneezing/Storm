import { useHistory } from "react-router-dom"
function FriendIndividual(props) {
    const { friendship } = props
    const history = useHistory()
    console.log("FRIEND in component", friendship)
    function messageRedirect(friendshipId){
        history.push(`/messages/${friendshipId}`)
    }
    return (
        <div className="friend-item">
            <div className="friend-name" onClick={()=>messageRedirect(friendship.id)}>
                {friendship.otherName.slice(1)}
            </div>
        </div>
    )
}
export default FriendIndividual
