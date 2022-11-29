import ReviewForm from "../reviewCreate";

function ReviewList(props) {
    const { reviews, owned } = props
    // console.log("REVIEWS IN REVIEWLIST :", reviews)

    return (
        <div className="reviews-container">
            {owned &&
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
