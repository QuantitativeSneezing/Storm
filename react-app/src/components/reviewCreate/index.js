import { useState } from "react"
import { addOneReview } from "../../store/review"
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOneGame } from "../../store/game";
import "./reviewCreate.css"
function ReviewForm() {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [recommend, setRecommend] = useState("")
    const gameId = useParams();
    let recommended = recommend === "like"
    let notRecommended = recommend === "dislike"

    console.log("GAME ID IN REVIEW FORM :", gameId.gameId)
    console.log("RECOMMEND STATUS :", recommended, notRecommended)
    const forPayload = gameId.gameId
    function submitReview() {
        const payload = { content: review, rating: recommend === "like", gameId: forPayload }
        dispatch(addOneReview(payload))
        dispatch(getOneGame(forPayload))
    }
    return (

        <div> SUBMIT YOUR REVIEW HERE!!!!
            <div className="review-input-container">
                <label> YOUR REVIEW</label>
                <label>
                    <textarea
                        className="inputFieldLarge"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <div className="review-recommend">
                    <div className="question">

                        Do you recommend this game?
                        <div className="button-grouper">
                            {!recommended && (
                                <div className={"recc-button"} onClick={() => setRecommend("like")}>
                                    Yes
                                </div>
                            )
                            }
                            {recommended && (
                                <div className={"recc-button-highlighted"}> Yes </div>
                            )}
                            <div className={"recc-button"} onClick={() => setRecommend("dislike")}>
                                No
                            </div>
                        </div>
                    </div>
                    <div className="review-submit" onClick={submitReview}> Post Review</div>
                </div>
            </div>
        </div>
    )
}
export default ReviewForm
