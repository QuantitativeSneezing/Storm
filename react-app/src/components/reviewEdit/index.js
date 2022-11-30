import { useState } from "react"
import { editOneReview } from "../../store/review";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editOneReview, deleteOneReview } from "../../store/review";
function ReviewEditForm() {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [recommend, setRecommend] = useState(true)
    const reviewId = useParams();
    function submitReview() {
        const payload = { content: review, rating: recommend, reviewId:reviewId }
        dispatch(editOneReview(payload))
    }
    function deleteReview(){
        dispatch(deleteOneReview(reviewId))
    }
    return (

        <div> EDIT YOUR REVIEW!!!!
            <div className="review-input-container">
                <label> YOUR REVIEW</label>
                <input className="review-text"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="TYPE YOUR REVIEW HERE"
                />
                <div className="review-recommend">
                    <div className="recc-button" onClick={() => setRecommend(true)}>
                        I LIKE THIS GAME
                    </div>
                    <div className="recc-button"  onClick={() => setRecommend(false)}>
                        I DISLIKE THIS GAME
                    </div>
                    <div className="review-submit" onClick={submitReview}> EDIT YOUR REVIEW</div>
                </div>
                <div className="review-submit" onClick={deleteReview}>DELETE THIS REVIEW?</div>
            </div>
        </div>
    )
}
export default ReviewEditForm
