import React,{Component} from 'react';
import classes from './RootWrapper.module.css';
import MessageArea from '../../containers/messageArea/messageArea';
import FriendsArea from '../../containers/friendsArea/friendsArea';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class RootWrapper extends Component {
    componentDidMount() {
        console.log('RootWrapper Mounted........................');
        let unread = 0;
        if(this.props.match.params.id !== undefined){
            let objToPass = null;
            if(this.props.friendsData[this.props.match.params.id] !== undefined){
                objToPass = this.props.friendsData[this.props.match.params.id];
            }
            console.log(objToPass);
            this.props.onSetCurrFriendStart(this.props.match.params.id,objToPass,this.props.userId);
            // this.props.onSetCurrFriend(this.props.match.params.id);
        } else {
            this.props.onSetCurrFriend(null);
        }
    }
    componentDidUpdate(prevProps) {
        // console.log('ROOTWRAPPER UPDATED REALLY ....................................................');
        // console.log(this.props.userId);
        if(prevProps.match.params.id !== this.props.match.params.id){
            console.log('RootWrapper Updated........................');
            let unread = 0;
            if(this.props.match.params.id !== undefined){
                let objToPass = null;
                if(this.props.friendsData[this.props.match.params.id] !== undefined){
                    objToPass = this.props.friendsData[this.props.match.params.id];
                }
                console.log(objToPass);
                this.props.onSetCurrFriendStart(this.props.match.params.id,objToPass,this.props.userId);
                // this.props.onSetCurrFriend(this.props.match.params.id);
            } else {
                this.props.onSetCurrFriend(null);
            } 
        }
        // console.log('RootWrapper Updated........................');
    }

    render() {
        let idToPass = null;
        console.log('RootWrapper says ... ');
        console.log(this.props.match.params.id);
        if(this.props.match.params.id !== undefined){
            idToPass = this.props.match.params.id
        };
        const isMobile = !(this.props.showFriends && this.props.showChat);
        const friendsArea = this.props.showFriends ? <FriendsArea 
                                                        // users={this.props.users}
                                                        isMobile={isMobile}
                                                        history={this.props.history} /> : null; 
        const messageArea = this.props.showChat ? <MessageArea 
                                                    
                                                    // message={this.props.message} 
                                                    submit={this.props.submit}
                                                    changed={this.props.changed}
                                                    idPassed={idToPass}
                                                    isMobile={isMobile} /> : null;
        return (
            <div className={classes.rootwrapper}>
                {/* <FriendsArea users={this.props.users} />
                <MessageArea 
                    messages={this.props.messages} 
                    message={this.props.message} 
                    submit={this.props.submit}
                    changed={this.props.changed}/> */}
                {friendsArea}
                {messageArea}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currObj: state.friends.currObj,
        userId: state.auth.userId,
        friendsDict: state.friends.friendsDict,
        friendsData: state.friends.friendsData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrFriend: (id) => dispatch(actions.setCurrFriend(id)),
        onSetCurrFriendStart: (id,messages,userId) => dispatch(actions.setCurrFriendStart(id,messages,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RootWrapper);