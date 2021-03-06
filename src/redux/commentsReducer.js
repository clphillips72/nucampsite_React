
import * as ActionTypes from './ActionTypes';

/* this is the reducer function to handle this part of the state */
export const CommentsReducer = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};