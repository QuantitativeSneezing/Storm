import ReviewForm from "../reviewCreate";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./reviewList.css"
function ReviewList(props) {
    const history = useHistory()
    const { reviews, owned } = props
    // console.log("REVIEWS IN REVIEWLIST :", reviews)
    const sessionUser = useSelector(state => state.session.user);
    let userHasReview = false;
    console.log("SESSION USER :", sessionUser)
    for (let i = 0; i < reviews.length; i++) {
        if (sessionUser) {
            if (reviews[i].title === sessionUser.username) {
                console.log("REVIEW IN REVIEW PAGE", reviews[i])
                userHasReview = reviews[i].id;
            }
        }
    }
    function redirectToReview(id) {
        history.push(`/reviews/${id}`)
    }
    return (
        <div className="reviews-container">
            {owned && !userHasReview &&
                <ReviewForm />
            }
            {userHasReview &&
                <div className="big-button">
                    <div onClick={() => redirectToReview(userHasReview)} className="menu-button"> manage your review? </div>
                </div>
            }
            {reviews.map((review) =>
                <div className="individual-review" key={review.id}>
                    <div className="review-user">{review.title}</div>
                    <div className="recommendation">{review.rating ? "RECOMMENDED" : "NOT RECOMMENDED"}</div>
                    <div className="review-content">{review.content}</div>
                </div>)}
        </div>
    )
}
export default (ReviewList)
