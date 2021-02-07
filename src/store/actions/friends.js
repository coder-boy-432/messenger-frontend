import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const fetchListStart = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_LIST_START
    };
}

export const fetchListFail = (error) => {
    return {
        type: actionTypes.FETCH_FRIENDS_LIST_FAIL,
        error: error
    };
}

export const fetchListSuccess = (list) => {
    return {
        type: actionTypes.FETCH_FRIENDS_LIST_SUCCESS,
        list: list
    }
}

export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_DATA_START
    }
}

export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_FRIENDS_DATA_FAIL,
        error: error
    }
}

export const fetchDataSuccess = (friendData) => {
    return {
        type: actionTypes.FETCH_FRIENDS_DATA_SUCCESS,
        friendData: friendData
    }
}

export const fetchList = () => {
    return dispatch => {
        dispatch(fetchListStart());
        axios.get('/friendslist')
            .then(response => {       
                dispatch(fetchListSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchListFail(error));
            });
    }
}

export const fetchData = (idGet) => {
    return dispatch => {
        dispatch(fetchDataStart());
        axios.get('/friendData/' + idGet)
            .then(response => {
                dispatch(fetchDataSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchDataFail(error));
            })
    }
}

export const setCurrFriend = (idCurr) => {
    return {
        type: actionTypes.SET_CURR_FRIEND,
        idCurr: idCurr
    }
};

export const setCurrFriendStart = (idCurr,objPassed,userIdNow) => {
    return async dispatch => {
        dispatch(setCurrFriend(idCurr));
        console.log('Set curr friend start reached .....................');
        let unread = 0;
        let friendData = null;
        console.log(objPassed);
        if(objPassed === null) {
            dispatch(fetchDataStart());
            await axios.get('/friendData/' + idCurr)
                .then(response => {
                    console.log('response got ..........................');
                    friendData = response.data;
                    dispatch(fetchDataSuccess(response.data));
                })
                .catch(error => {
                    dispatch(fetchDataFail(error));
                })
        } else {
            friendData = objPassed
        }
        // dispatch(setCurrFriend(idCurr));
        console.log('friendsData is .............................');
        console.log(friendData);
        friendData.userData.forEach(user => {
            console.log(userIdNow);
            console.log(user.unread);
            if(user.userId === userIdNow) {
                unread = user.unread;
            }
        });
        console.log('unread value is .............................');
        console.log(unread);
        
        let arr = []
        if(unread > 0) {
            arr = friendData.chats.slice(friendData.chats.length - unread,friendData.chats.length);
            console.log('array is .....................');
            console.log(arr);
        }
        if(arr.length > 0) {
            console.log("******************************************** array length greater than 0 ###############################");
            axios.post('/readmessages/' + idCurr, {messagesRead: arr})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}

export const addFriendMessage  = (message) => {
    return {
        type: actionTypes.ADD_FRIEND_MESSAGE,
        message: message
    }
}

export const addFriendMessageStart = (idCurr,message) => {
    return async dispatch => {
        await dispatch(addFriendMessage(message));
        let arr = [];
        arr.push(message);
        if(idCurr !== null && message.chatId === idCurr) {
            console.log("sending readMessages from addfriendMesage #*#*#**********************$$$$$$$$$");
            axios.post('/readmessages/' + idCurr, {messagesRead: arr})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}

export const addNewFriend = (friend) => {
    return {
        type: actionTypes.ADD_NEW_FRIEND,
        friend: friend
    }
}

export const readMessages = (data) => {
    return {
        type: actionTypes.READ_MESSAGE,
        messagesData: data
    };
};

export const userStatusUpdate = (data) => {
    return {
        type: actionTypes.USER_STATUS_UPDATE,
        data: data
    }
}