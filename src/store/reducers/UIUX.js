import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utiliity';

const initialState = {
    isMobile: false
};

const setIsMobile = (state,action) => {
    return updateObject(state, {isMobile: true});
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.SET_IS_MOBILE: return setIsMobile(state,action);
        default: 
            return state;
    }
}

export default reducer;