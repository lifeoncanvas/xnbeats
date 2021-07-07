import {
    ADD_REVIEW,
	CLEAR_REVIEW,
	GET_REVIEWS
} from '../types';



export default function (state={},action){
	switch (action.type){
		case ADD_REVIEW:
			return {...state,addedReview:action.payload}
			 case CLEAR_REVIEW:
            return { addedReview: action.payload }
			case GET_REVIEWS:
            return { ...state, adminReviews: action.payload}

		default:
			return state;
	}
}





