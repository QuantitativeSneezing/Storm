import { useState } from "react"
import { addOneReview } from "../../store/review"
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOneGame } from "../../store/game";
import "./reviewCreate.css"
function ReviewForm({ game }) {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [recommend, setRecommend] = useState("")
    const gameId = useParams();
    let recommended = recommend === "like"
    let notRecommended = recommend === "dislike"

    // console.log("GAME ID IN REVIEW FORM :", gameId.gameId)
    // console.log("RECOMMEND STATUS :", recommended, notRecommended)
    // console.log("game in review form :", game)
    const forPayload = gameId.gameId
    function submitReview() {
        const payload = { content: review, rating: recommend === "like", gameId: forPayload }
        dispatch(addOneReview(payload))
        dispatch(getOneGame(forPayload))
    }
    return (


        <div className="review-create-box">
            <div className="owned-title">Write a Review for {game.title}</div>
            <div className="review-input-container">
                <label>
                    <textarea
                        className="inputFieldLarge"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        placeholder="Write your review here"
                    />
                </label>
                <div className="review-length-container">

                    <span className="review-length-shower" style={review.length>255 ?{color:"red"} : {}}>
                        {review.length}/255
                    </span>
                </div>
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
                            {!notRecommended && (<div className={"recc-button"} onClick={() => setRecommend("dislike")}>
                                No
                            </div>)}

                            {notRecommended && (
                                <div className={"recc-button-highlighted"}> No </div>
                            )}
                        </div>
                    </div>
                    {review && (recommended || notRecommended) && (review.length < 255) &&
                        <div className="recc-button" onClick={submitReview}> Submit Review</div>
                    }
                    {(!review || (!recommended && !notRecommended) || (review.length > 255)) &&
                        <div className="recc-button-disabled" >Submit Review</div>
                    }

                </div>
            </div>
        </div>
    )
}
export default ReviewForm
