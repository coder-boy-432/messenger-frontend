import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utiliity';

const initialState = {
    friendsList: [],
    friendsData: {},
    friendsDict: {},
    loadingData: false,
    errorData: false,
    loadingList: false,
    errorList: false,
    friendsFetched: false,
    currFriend: null,
    currObj: {
        chats: []
    }
};

const fetchFriendsListStart = (state,action) => {
    return updateObject(state, {errorList: null, loadingList: true});
}

const fetchFriendsListSuccess = (state,action) => {
    let tempData = {...state.friendsDict};
    action.list.forEach(friend => {
        tempData[friend._id] = friend;
    });
    return updateObject(state,{
        friendsList: action.list,
        loadingList: false,
        errorList: null,
        friendsFetched: true,
        friendsDict: tempData
    });
}

const fetchFriendsListFail = (state,action) => {
    return updateObject(state,{errorList: action.error, loadingList: false})
}

const fetchFriendsDataStart = (state,action) => {
    return updateObject(state, {errorData: null, loadingData: true});
}

const fetchFriendsDataSuccess = (state,action) => {
    let tempData = {...state.friendsData};
    tempData[action.friendData._id] = action.friendData;
    return updateObject(state,{
        currObj: action.friendData,
        friendsData: tempData,
        loadingData: false,
        errorData: null
    });
}

const fetchFriendsDataFail = (state,action) => {
    return updateObject(state,{errorData: action.error, loadingData: false})
}

const setCurrFriend = (state,action) => {
    let updateParams = {
        currFriend: action.idCurr
    }
    if(action.idCurr === null) { 
        updateParams = {
            currFriend: action.idCurr,
            currObj: {
                chats: []
            }
        }
    }
    if(state.friendsData[action.idCurr] !== undefined) {
        let tempDict = {...state.friendsDict};
        // // if(tempDict[action.idCurr].userData[0].userId === state.userId){
        // //     tempDict[action.idCurr].userData[0].unread = 0
        // // } 
        // tempDict[action.idCurr].userData.forEach(item => {
        //     if(item.userId === state.userId){
        //         item.unread = 0;
        //     }
        // });
        updateParams = {
            currFriend: action.idCurr,
            currObj: state.friendsData[action.idCurr]
        }
    }
    return updateObject(state,updateParams);
}

const addFriendMessage = (state,action) => {
    let TempData = {...state.friendsData};
    let tempDict = {...state.friendsDict};
    if(TempData[action.message.chatId] !== undefined){
        TempData[action.message.chatId].chats.push(action.message);
        TempData[action.message.chatId].userData.forEach(user => {
            if(user.userId !== action.message.senderId) {
                user.unread = user.unread + 1;
            }
        });
    }
    tempDict[action.message.chatId].userData.forEach(user => {
        if(user.userId !== action.message.senderId) {
            user.unread = user.unread + 1;
        }
    });
    console.log('Inside add friend message');
    console.log(TempData);
    return updateObject(state,{
        friendData: TempData,
        friendsDict: tempDict
    })
}

const addNewFriend = (state,action) => {
    let tempList = [...state.friendsList];
    let tempDict = {...state.friendsDict};
    tempList = tempList.concat(action.friend);
    tempDict[action.friend._id] = action.friend;
    return updateObject(state,{
        friendsList: tempList,
        friendsDict: tempDict
    });
}

const readMessages = (state,action) => {
    let tempDict = {...state.friendsDict};
    let tempData = {...state.friendsData};
    let tempObj = {...state.currObj};
    // let count = 0;
    if(tempData[action.messagesData.chatId] !== undefined) {
        tempData[action.messagesData.chatId].chats.forEach(message => {
            if(action.messagesData.messageIdList.includes(message._id)) {
                // count = count + 1;
                message.readBy = message.readBy.concat(action.messagesData.readerId); 
            }
        });
        if(state.currFriend === action.messagesData.chatId && tempObj._id !== undefined){
            tempObj.chats.forEach(message => {
                if(action.messagesData.messageIdList.includes(message._id)) {
                    if(!message.readBy.includes(action.messagesData.readerId)){
                        message.readBy = message.readBy.concat(action.messagesData.readerId); 
                    }
                }   
            })
        }
    }
    tempData[action.messagesData.chatId].userData.forEach(user => {
        if(user.userId === action.messagesData.readerId) {
            user.unread = user.unread - action.messagesData.messageIdList.length;
        }
    });
    tempDict[action.messagesData.chatId].userData.forEach(user => {
        if(user.userId === action.messagesData.readerId) {
            user.unread = user.unread - action.messagesData.messageIdList.length;
        }
    });
    return updateObject(state,{
        friendsDict: tempDict,
        friendsData: tempData,
        currObj: tempObj
    });
}

const userStatusUpdate = (state,action) => {
    let tempData = {...state.friendsData};
    let tempDict = {...state.friendsDict};
    let tempObj = {...state.currObj};
    const userDataNow = action.data;
    if(state.friendsFetched) {
        tempDict[userDataNow.chatId].userData.forEach(user => {
            if(user.userId === userDataNow.userId) {
                user.online = userDataNow.status;
            }
        });
        if(tempData[userDataNow.chatId] !== undefined) {
            tempData[userDataNow.chatId].userData.forEach(user => {
                if(user.userId === userDataNow.userId) {
                    user.online = userDataNow.status;
                }
            }); 
            if(state.currFriend === userDataNow.chatId && tempObj._id !== undefined){
                tempObj.userData.forEach(user => {
                    if(user.userId === userDataNow.userId) {
                        user.online = userDataNow.status;
                    }
                })
            }
        }
    }
    return updateObject(state,{
        friendsDict: tempDict,
        friendsData: tempData,
        currObj: tempObj
    });
}


// const authSuccess = (state,action) => {
//     return updateObject(state, {
//         username: action.username,
//         token: action.idToken,
//         userId: action.userId,
//         error: null,
//         loading: false
//     });
// };

// const authFail = (state,action) => {
//     return updateObject(state, {
//         error: action.error,
//         loading: false
//     });
// };

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_FRIENDS_DATA_START: return fetchFriendsDataStart(state,action);
        case actionTypes.FETCH_FRIENDS_DATA_SUCCESS: return fetchFriendsDataSuccess(state,action);
        case actionTypes.FETCH_FRIENDS_DATA_FAIL: return fetchFriendsDataFail(state,action);
        case actionTypes.FETCH_FRIENDS_LIST_START: return fetchFriendsListStart(state,actionTypes);
        case actionTypes.FETCH_FRIENDS_LIST_SUCCESS: return fetchFriendsListSuccess(state,action);
        case actionTypes.FETCH_FRIENDS_LIST_FAIL: return fetchFriendsListFail(state,action);
        case actionTypes.SET_CURR_FRIEND: return setCurrFriend(state,action);
        case actionTypes.ADD_FRIEND_MESSAGE: return addFriendMessage(state,action);
        case actionTypes.ADD_NEW_FRIEND: return addNewFriend(state,action);
        case actionTypes.READ_MESSAGE: return readMessages(state,action);
        case actionTypes.USER_STATUS_UPDATE: return userStatusUpdate(state,action);
        // case actionTypes.AUTH_START: return authStart(state,action);
        // case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        // case actionTypes.AUTH_FAIL: return authFail(state,action);
        // case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        // case actionTypes.SET_USER_NAME_SENT: return setUsernameSent(state,action);
        default: 
            return state;
    }
}

export default reducer;