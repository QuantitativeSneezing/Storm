import ReviewForm from "../reviewCreate";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./reviewList.css"
function ReviewList(props) {
    const history = useHistory()
    const { reviews, owned, game } = props
    // console.log("REVIEWS IN REVIEWLIST :", reviews)
    const sessionUser = useSelector(state => state.session.user);
    let userHasReview = false;
    // console.log("SESSION USER :", sessionUser)
    for (let i = 0; i < reviews.length; i++) {
        if (sessionUser) {
            if (reviews[i].title === sessionUser.username) {
                // console.log("REVIEW IN REVIEW PAGE", reviews[i])
                userHasReview = reviews[i].id;
            }
        }
    }
    function redirectToReview(id) {
        history.push(`/reviews/${id}`)
    }
    function redirectToLibrary() {
        history.push(`/library`)
    }
    return (
        <div className="reviews-container">
            {owned && !userHasReview &&
                <div className="review-library-container">
                    <span onClick={() => redirectToLibrary(userHasReview)} className="recc-button"> View this game in your library</span>
                    <ReviewForm game={game} />
                </div>
            }
            {userHasReview &&
                <div className="review-buttons">
                    <span onClick={() => redirectToReview(userHasReview)} className="recc-button"> Manage your review </span>
                    <span onClick={() => redirectToLibrary(userHasReview)} className="recc-button"> View this game in your library</span>
                </div>
            }
            <div className="review-area">
                {reviews.map((review) =>
                    <div id="individual-review" key={review.id}>
                        <div className="recc-container">
                            <div className="spacer"></div>
                            <span>{review.title}</span><span>{review.rating ? "Recommended" : "Not recommended"}</span>
                        </div>
                        <div className="review-content">{review.content}</div>
                    </div>)}
            </div>
        </div>
    )
}
export default (ReviewList)
