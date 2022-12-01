import { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editOneReview, getAllReviews, deleteOneReview } from "../../store/review";
function ReviewEditForm() {
    const dispatch = useDispatch()
    const history= useHistory()
    // const [review, setReview] = useState("")
    // const [recommend, setRecommend] = useState("")
    const { reviewId } = useParams();

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])
    const reviews = useSelector(state => state.review.reviews)
    const reviewsArray= Object.values(reviews)
    let oldReview;
    console.log("REVIEW ID :", reviewId, reviews, reviewsArray)
    if (reviews) {
        console.log("REVIEWS :",reviews)
        oldReview = reviews.find(review => +review.id === +reviewId)
    }
    console.log("OLD REVIEW :", oldReview)
    // console.log(reviewsOld, "OLD DATA")



    const [review, setReview] = useState(oldReview.review)
    const [recommend, setRecommend] = useState(oldReview.recommend)
    // if (reviews)
    function editReview() {
        const payload = { content: review, rating: recommend, reviewId: reviewId }
        dispatch(editOneReview(payload))
        history.push()
    }
    function deleteReview() {
        dispatch(deleteOneReview(reviewId))
        history.push('/')
    }
    return (

        <div> EDIT REVIEW HERE!!!!
            <div className="review-input-container">
                <label> YOUR REVIEW</label>
                <input className="review-text"
                    type="textarea"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="TYPE YOUR REVIEW HERE"
                />
                <div className="review-recommend">
                    <div className="question">

                        Do you recommend this game?
                        <div className="button-grouper">
                            <div className={"recc-button"} onClick={() => setRecommend("like")}>
                                Yes
                            </div>
                            <div className={"recc-button"} onClick={() => setRecommend("dislike")}>
                                No
                            </div>
                        </div>
                    </div>
                    <div className="review-submit" onClick={editReview}> Edit Review</div>

                </div>
                <div className="delete-review" onClick={deleteReview}>Delete your review</div>
            </div>
        </div>
    )
}
export default ReviewEditForm
