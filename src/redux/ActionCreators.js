import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());
    
    return fetch(baseUrl + 'campsites')
    // calling fetch() and returning the result.  baseUrl is an imported file
    // and campsite is the location for the resource we want.  A call to fetch returns 
    // a promise.
      .then(response => response.json())  
    //When that promise is resolved, the then() method will use the
    // response.json() method to convert the response from json to javascript, and that 
    // javascript will be an array of campsites.  The json method returns a new 
    // promise for which the converted javascript array is the new response value when 
    // it resolves. 
      .then(campsites => dispatch(addCampsites(campsites)))
     // grabbing that javascript array is the first campsites argument once that promise
     // resolves.  Then we can dispatch that campsites argument with the addCampsites
     // action creator to be used as its payload.  we won't be dealeing with errors
     // or adding a catch() mehtod to this fetch() yet but will be coming.
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {    
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});