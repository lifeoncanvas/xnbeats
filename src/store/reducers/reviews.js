import {
    ADD_REVIEW
	//CLEAR_REVIEW
} from '../types';

export default function (state={},actions){
	switch (actions.type){
		case ADD_REVIEW:
			return {...state,addedReview:actions.payload}
			// case CLEAR_REVIEW:
            // return { addedReview: action.payload }
		default:
			return state;
	}
}

