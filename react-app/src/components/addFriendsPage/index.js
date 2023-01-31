import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticate } from "../../store/session"
// import FriendIndividual from "../friendIndividual"
// import "./friendsList.css"
function AddFriendsList() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);
    useEffect(() => {
        dispatch(authenticate())
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    // const friends = useSelector(state => state.friends.friendships)
    const user = useSelector(state => state.session.user)
    console.log("POTENTIAL FRIENDS LIST USERS", users)
    // if (friends) {
    //     for (let i = 0; i < friends.length; i++) {
    //         if (+friends[i].nicknameOne[0] === user.id) {
    //             friends[i].otherName= friends[i].nicknameTwo
    //                 }else if (+friends[i].nicknameTwo[0]===user.id){
    //                     friends[i].otherName= friends[i].nicknameOne
    //             }
    //         }
    //     }
    return (
        <div className="friends-page">
            <div className='game-title'> Add Friends</div>
            {/* {friends &&
                    friends.map((friend) =>
                        <div className="friend-map" key={friend.id}>
                            <FriendIndividual friendship={friend}></FriendIndividual>
                        </div>
                    )} */}
        </div>
    )
}
export default AddFriendsList
