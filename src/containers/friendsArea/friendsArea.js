import React,{Component} from 'react';
import classes from './friendsArea.module.css';
import FriendComp from './friendComp/friendComp';
import UserDashboard from './userDashboard/userDashboard';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as  actions from '../../store/actions/index';


class friendsArea extends Component{
    componentDidMount() {
        console.log('Mounted FriendsArea');
        if(!this.props.friendsFetched){
            this.props.onfetchFriendsList();
        }
    }
    clickHandler = (idRNow) => {
        //need an if check
        console.log('Inside clickHandler ...');
        console.log(idRNow);
        this.props.history.push('/friends/' + idRNow);
    }
    render() {
        const friends = [...this.props.usersList];
        console.log('friends are');
        console.log(friends);
        console.log(this.props.isMobile);
        const myStyle = {
            width: this.props.isMobile ? "100%" : "30%"
        }
        let content = null;
        console.log(this.props.usersList);
        if(friends.length > 0) {
            content = friends.map((user) => {
                let indexNow = user.userData[0].userId === this.props.userId ? 1 : 0 ;
                let userIndex = null;

                for (let index = 0; index < this.props.friendsDict[user._id].userData.length; index++) {
                    const userNow = this.props.friendsDict[user._id].userData[index];
                    if(userNow.userId === this.props.userId) {
                        userIndex = index;
                    }
                }

                const unread = this.props.friendsDict[user._id].userData[userIndex].unread;
                // console.log('inside friends render ...');
                // console.log(user.userData[0]);
                return (
                    <div onClick={() => this.clickHandler(user._id)}>
                            <FriendComp name={user.name !== undefined? user.name: user.userData[indexNow].username} online={user.userData[indexNow].online}
                                chatId={user._id} unread={unread} />
                    </div>
                )
            });
        }
        
        return (
            <div style={myStyle} className={classes.friendsArea}>
                <UserDashboard name={this.props.name}/>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.username,
        usersList: state.friends.friendsList,
        userId: state.auth.userId,
        friendsDict: state.friends.friendsDict,
        friendsFetched: state.friends.friendsFetched
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchFriendsList: () => dispatch(actions.fetchList()),
        onFriendClicked: (idNow) => dispatch(actions.setCurrFriend(idNow)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(friendsArea);