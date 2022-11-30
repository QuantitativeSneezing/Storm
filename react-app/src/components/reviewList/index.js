import ReviewForm from "../reviewCreate";
import { useSelector } from "react-redux";
import "./reviewList.css"
function ReviewList(props) {
    const { reviews, owned } = props
    // console.log("REVIEWS IN REVIEWLIST :", reviews)
    const sessionUser = useSelector(state => state.session.user);
    let userHasReview = false;
    console.log("SESSION USER :", sessionUser)
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].title === sessionUser.username) {
            userHasReview= true;
        }
    }
    return (
        <div className="reviews-container">
            {owned && !userHasReview &&
                <ReviewForm />
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
