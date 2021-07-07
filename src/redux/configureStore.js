import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';
import logger                           from 'redux-logger';
import { CampsitesReducer }             from './campsitesReducer';
import { CommentsReducer }              from './commentsReducer';
import { PartnersReducer }              from './partnersReducer';
import { PromotionsReducer }            from './promotionsReducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites:  CampsitesReducer,
            comments:   CommentsReducer,
            partners:   PartnersReducer,
            promotions: PromotionsReducer  
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};