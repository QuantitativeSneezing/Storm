function ReviewList(reviews) {
    console.log("REVIEWS IN REVIEWLIST :", reviews)
    reviews= reviews.reviews
    return (
    <div className="reviews-container">
        {reviews.map((review)=>
        <div className="individual-review">
            <div className="review-user">{review.title}</div>
            <div className="recommendation">{review.rating ? "RECOMMENDED" : "NOT RECOMMENDED"}</div>
            <div className="review-content">{review.content}</div>

        </div>)}
    </div>
    )
}
export default (ReviewList)
