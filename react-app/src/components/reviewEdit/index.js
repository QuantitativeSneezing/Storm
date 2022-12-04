import { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editOneReview, getAllReviews, deleteOneReview } from "../../store/review";
import { getLibraryGames } from "../../store/game";
function ReviewEditForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [recommend, setRecommend] = useState("")
    const { reviewId } = useParams();

    useEffect(() => {
        dispatch(getAllReviews())
        dispatch(getLibraryGames())
    }, [dispatch])
    const reviews = useSelector(state => state.review.reviews)

    let oldReview;
    useEffect(() => {
        if (oldReview) {
            setReview(oldReview.content)
            setRecommend(oldReview.rating)
        }
    }, [oldReview, reviews])
    console.log("REVIEW ID :", reviewId, reviews)
    if (reviews) {
        console.log("REVIEWS :", reviews)
        oldReview = reviews.find(review => +review.id === +reviewId)
        if (oldReview) {
        }
    }
    console.log("OLD REVIEW :", oldReview)
    // console.log(reviewsOld, "OLD DATA")
    let recommended = recommend === "like"
    let notRecommended = recommend === "dislike"
    // let currentGame;
    if (oldReview) {

    }
    // const [review, setReview] = useState(oldReview.review)
    // const [recommend, setRecommend] = useState(oldReview.recommend)
    // if (reviews)
    function editReview() {
        const payload = { content: review, rating: recommend, reviewId: reviewId }
        dispatch(editOneReview(payload))
        history.push(`/app/${oldReview.game_id}`)
    }
    function deleteReview() {
        dispatch(deleteOneReview(reviewId))
        history.push('/')
    }
    if (!oldReview) {
        return null
    }
    // if (!currentGame) {
    //     return null
    // }
    return (
        <div className="game-detail-container">

            <div className="review-create-box">
                <img src={oldReview.game_image.url} alt="I lifted these all from steam lol"></img>
                <div className="owned-title">Edit your review for {oldReview.game_name}</div>
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
                        {review && (recommended || notRecommended) &&
                            <div className="recc-button" onClick={editReview}> Save Changes</div>
                        }
                        {(!review || (!recommended && !notRecommended)) &&
                            <div className="recc-button-disabled" >Save Changes</div>
                        }

                    </div>
                    <div className="recc-button" onClick={deleteReview}>Delete your review</div>
                </div>
            </div>
        </div>
    )
}
export default ReviewEditForm
