import { useState } from "react"
import { addOneReview } from "../../store/review"
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ReviewForm() {
    const dispatch= useDispatch()
    const [review, setReview] = useState("")
    const [recommend, setRecommend] = useState(true)
    const gameId = useParams();
    console.log("GAME ID IN REVIEW FORM :", gameId.gameId)
    const forPayload = gameId.gameId
    function submitReview(e) {

        const payload = { content:review, rating:recommend, gameId: forPayload }
        dispatch(addOneReview(payload))
    }
    return (

        <div> SUBMIT YOUR REVIEW HERE!!!!
            <div className="review-input-container">
                <label> YOUR REVIEW</label>
                <input className="review-text"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="TYPE YOUR REVIEW HERE"
                />
                <div className="review-recommend">
                    <div className={recommend ? "recc-button-highlighted" : "recc-button"} onClick={() => setRecommend(true)}>
                        I LIKE THIS GAME
                    </div>
                    <div className={recommend ? "recc-button" : "recc-button-highlighted"} onClick={() => setRecommend(false)}>
                        I DISLIKE THIS GAME
                    </div>
                    <div className="review-submit" onClick={submitReview}> SUBMIT YOUR REVIEW</div>
                </div>
            </div>
        </div>
    )
}
export default ReviewForm
