import * as actionTypes from './actionTypes';

export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_DATA_START
    }
}

export const setIsMobile = () => {
    return {
        type: actionTypes.SET_IS_MOBILE
    }
};