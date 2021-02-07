import React,{Component} from 'react';
import WritingArea from '../../components/WritingArea/WritingArea';
import FriendDashBoard from './friendDashBoard/friendDashBoard';
import MessageComp from './messageComp/messageComp';
import classes from './messageArea.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class messageArea extends Component {
    state = {
        message: ""
    }

    setMessage = (message) => {
        this.setState({message: message});
    }
    
    submit = event => {
        event.preventDefault();
        //not secure messageData should be composed in backend
        let messageData = {
            senderId: this.props.userId,
            senderName: this.props.username,
            chatId: this.props.idPassed,
            message: this.state.message
        }
        this.props.submit(messageData);
        // socket.emit("send", this.state.message);
        this.setMessage("");
    };
    changedHandler = (event) => {
        this.setMessage(event.target.value);
    }
    componentDidMount() {
        const curr = this.props.idPassed;
        console.log('messageArea says ...');
        console.log(curr);
        // if(this.props.idPassed !== null) {
        //     if(this.props.friendsData[curr] === undefined){
        //         console.log('Fetching ...');
        //         this.props.onFetchData(curr);
        //     }
        // }
        
        // if(this.props.friendNotExists && this.props.currFriend !== null){
        //     console.log('Fetching ...');
        //     this.props.onFetchData(curr);
        // }
    }

    componentDidUpdate() {
        const curr = this.props.idPassed;
        console.log('messagearea updated')
        console.log(this.props.idPassed);
        // if(this.props.idPassed !== null) {
        //     if(this.props.friendsData[curr] === undefined){
        //         console.log('Fetching ...');
        //         this.props.onFetchData(curr);
        //     }
        // }

        // if(this.props.friendNotExists && this.props.currFriend !== null){
        //     console.log('Fetching ...');
        //     this.props.onFetchData(curr);
        // }
    }

    // down below was a bad idea

    // shouldComponentUpdate(nextProps) {
    //     console.log('Inside shouldComponentUpdate................................');
    //     if(nextProps.friendsData[nextProps.idPassed] !== undefined && this.props.friendsData[this.props.idPassed] !== undefined){
    //         if(nextProps.friendsData[nextProps.idPassed].chats.length !== this.props.friendsData[this.props.idPassed].chats.length){
    //             return true
    //         } else {
    //             return true
    //         }
    //     } else {
    //         return true
    //     }
    // }

    render() {
        console.log('dict value for possibly null is ....');
        console.log(this.props.friendNotExists);
        // let messages = [];


        // const arr2 = ['sender','reciever'];

        const myStyle = {
            width: this.props.isMobile ? "100%" : "70%"
        };
        let dashBoard = (
            <FriendDashBoard name={'Select a friend'} />
        )
        if(this.props.friendsData[this.props.idPassed] !== undefined) {
            const data = {...this.props.friendsData[this.props.idPassed]};
            console.log('Data is..');
            console.log(data);
            let indexNow = data.userData[0].userId === this.props.userId ? 1 : 0 ;
            dashBoard = (
                <FriendDashBoard name={data.name !== undefined? data.name : data.userData[indexNow].username}
                    online={data.name !== undefined? "Tap here for group info" : (data.userData[indexNow].online ? "online" : "offline")} />
            )
            // messages = this.props.friendsData[this.props.idPassed].chats;
        }

        const messages = this.props.messagesNow;

        let content = messages.map(message => {
            const owner = message.senderId === this.props.userId ? "sender" : "reciever";
            return (
                // <h2>ITS A MEEE</h2>
                <MessageComp owner={owner} read={message.readBy.length > 1} >
                    {message.message}
                </MessageComp>
            )
        });

        // let content = this.props.messagesNow.map(message => {
        //     const owner = message.senderId === this.props.userId ? "sender" : "reciever";
        //     return (
        //         // <h2>ITS A MEEE</h2>
        //         <MessageComp owner={owner}>
        //             {message.message}
        //         </MessageComp>
        //     )
        // });
        return (
            <div style={myStyle} className={classes.messageArea}>
                <div className={classes.FriendDashBoard}>
                    {dashBoard}
                </div>
                <div className={classes.messagebox}>
                    {content}
                </div>
                <div className={classes.WritingArea}>
                    <WritingArea submit={this.submit}
                     changed={this.changedHandler}
                     message={this.state.message} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        currFriend: state.friends.currFriend,
        friendsData: state.friends.friendsData,
        friendNotExists: state.friends.friendsData[state.friends.currFriend] === undefined,
        messagesNow: state.friends.currObj.chats,
        messagesLen: state.friends.currObj.chats.length
        // messagesNow : state.friends.friendsData[state.friends.currFriend] !== undefined ? state.friends.friendsData[state.friends.currFriend].chats : []
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (idNow) => dispatch(actions.fetchData(idNow))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(messageArea);