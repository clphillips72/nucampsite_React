import { createStore, combineReducers } from 'redux';
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
        })
    );

    return store;
};