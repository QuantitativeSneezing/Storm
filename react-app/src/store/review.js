const ADD_REVIEW = 'reviews/addReview'
// const LOAD_ONE = "reviews/:reviewId"
const LOAD_ALL = 'reviews/all'
// const CURRENT_DM = "reviews/current/dm"
// const CURRENT = "reviews/current"
const EDIT_REVIEW = 'reviews/editCurrentReview'
const DELETE_REVIEW = 'reviews/delete'


export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};
export const updateReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};
export const loadAll = (reviews) => {
    return {
        type: LOAD_ALL,
        reviews
    }
}


// export const current = (reviews) => {
//     return {
//         type: CURRENT,
//         reviews
//     }
// }
export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    };
};

export const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    };
};
export const getAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/all`);
    if (response.ok) {
        const reviews = await response.json();
        console.log("THUNK REVIEWS :", reviews)
        const result = dispatch(loadAll(reviews.reviews))
        //console.log("RESULT OF DISPATCHING :", result)
        return result
    }
};



export const addOneReview = (data) => async dispatch => {
    const { content, rating, gameId } = data
    console.log("CONTENT IN ADD ONE", data)
    const response = await fetch(`/api/reviews/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating }),
    })
    if (response.ok) {
        console.log("responded")
        const newReview = await response.json();
        dispatch(addReview(response))
        return newReview
    }
}



export const editOneReview = (payload) => async dispatch => {
    const { reviewId, content } = payload;
    // console.log("STUFF IN EDIT :",reviewId, content)
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    })

    if (response.ok) {
        const editedReview = await response.json();
        dispatch(editReview(editedReview));
        return editedReview;
    }
}

export const deleteOneReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const toDelete = await response.json();
        console.log(toDelete)
        dispatch(deleteReview(reviewId));
    }
}


const reviewReducer = (state = {reviews:[]}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, ...newState, reviews: [...action.reviews] };
        case ADD_REVIEW:
            // if there is a review already, skip this and go straight to overwriting it
            if (!state[action.review.id]) {
                newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                const reviewList = newState.reviews.map(id => newState[id]);
                reviewList.push(action.review);
                newState.reviews = reviewList;

                return newState;
            }
            return {
                ...state,
            };
        case DELETE_REVIEW:
            const newReviews = state.reviews.filter(review => review.id === action.reviewId)
            newState = { ...state, reviews: newReviews }
            return newState;
        default:
            return state;
    }
};
export default reviewReducer;
