import * as ActionTypes from './ActionTypes';

/* this is the reducer function to handle this part of the state */
// This reducer responds to the 3 partner actions (ADD/LOADING/FAILED) that were added to ActionTypes.js
export const PartnersReducer = (state = {
    isLoading: true,
    errMess: null,
    partners: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};
        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};