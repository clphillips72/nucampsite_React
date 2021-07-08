import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';
import logger                           from 'redux-logger';
import { CampsitesReducer }             from './campsitesReducer';
import { CommentsReducer }              from './commentsReducer';
import { PartnersReducer }              from './partnersReducer';
import { PromotionsReducer }            from './promotionsReducer';
import { createForms }                  from 'react-redux-form';
import { InitialFeedback }              from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites:  CampsitesReducer,
            comments:   CommentsReducer,
            partners:   PartnersReducer,
            promotions: PromotionsReducer,
            ...createForms({
                feedbackForm: InitialFeedback 
                // createForms() is a helper function from the react-redux-form library
                // (imported above) that makes it easy to set up reducers to update 
                // the state whenever new form values are submitted.  It is designed to
                // be used with the redux function combineReducers() as it is here.  We'll 
                // pass that function to combineReducers() as one of the arguments using the spread syntax 
                // and giving it an argument that contains a "model" name (i.e. .firstName) which 
                // we'll call feedbackForm
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};