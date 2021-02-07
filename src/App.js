import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
// import WritingArea from './components/WritingArea/WritingArea';
import MessageArea from './containers/messageArea/messageArea';
import FriendsArea from './containers/friendsArea/friendsArea';
import SearchComp from './containers/search/search';
import CreateGroup from './containers/newGroup/search';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import RootWrapper from './components/RootWrapper/RootWrapper';
import * as actions from './store/actions/index';
import io from "socket.io-client";

// const username = prompt("what is your username");

const socket = io("https://floating-brook-76207.herokuapp.com", {
  transports: ["websocket", "polling"]
});

class App extends Component {
  state = {
    users: [],
    messages: [],
    message: "",
    isMobile: false
  }

  componentDidUpdate() {
    console.log('updated');
    if(!this.props.usernameSent && this.props.userAuthenticated){
      socket.emit("userConnected",{username: this.props.username,userId: this.props.userId});
      this.props.onSetUsernameSent();
    }
    console.log(this.props.usernameSent);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    console.log('is user authenticated');
    console.log(this.props.userAuthenticated);
    console.log("mounted");
    this.handleWindowsize();
    // socket.on("connect", () => {
    //   socket.emit("username",username);
    // });

    // if(this.props.userAuthenticated) {
    //   socket.emit("username",this.props.username);
    // }

    socket.on("users", users => {
      console.log(users);
      this.setUsers(users);
    });

    socket.on("message", message => {
      console.log('A new message arrived ...');
      console.log(message);
      // this.props.onAddFriendMessage(message);
      this.props.onAddFriendMessageStart(this.props.currFriend,message);
      this.setMessages(message);
    });

    socket.on('addNewFriend', newFriend => {
      console.log('New friend/group has arrived in the scene');
      console.log(newFriend);
      this.props.onAddNewFriend(newFriend);
    });

    socket.on("readMessages", messagesData => {
      this.props.onReadMessages(messagesData);
    });

    socket.on('userStatusUpdate', data => {
      this.props.onUserUpdateStatus(data);
    })

    socket.on("connected", user => {
      this.addUser(user);
    });

    socket.on("disconnected", id => {
      this.removeUser(id);
    })
  }

  setUsers = (users) => {
    this.setState({users: users});
  }

  addUser = (user) => {
    let users = [...this.state.users];
    users.push(user);
    this.setState({users: users});
  }

  removeUser = (id) => {
    let users = [...this.state.users];
    users.filter(user => user.id !== id);
    this.setState({users: users});
  }

  setMessages = (message) => {
    let messages  = [...this.state.messages];
    messages.push(message);
    this.setState({messages: messages});
  }

  setMessage = (message) => {
    this.setState({message: message});
  }

  submit = messageRec => {
    socket.emit("send", messageRec);
  };

  changedHandler = (event) => {
    this.setMessage(event.target.value);
  }

  handleWindowsize = () => {
    this.setState({isMobile: window.innerWidth < 480});
  }
  render() {
    // let redirect = null;
    // if(!this.props.userAuthenticated) {
    //   redirect = <Redirect to='/auth' />
    // }
    return (
      <div className='App'>
        {/* <div className='nonNavbar'>
          <FriendsArea users={this.state.users} />
          <MessageArea 
            messages={this.state.messages} 
            message={this.state.message} 
            submit={this.submit}
            changed={this.changedHandler}/>
        </div> */}
        {/* {redirect} */}
        <Switch>
          {/* <Route path='/friends/:id' exact render={(routerProps) => 
            <RootWrapper
            // users={this.state.users}
            {...routerProps}
            // messages={this.state.messages} 
            // message={this.state.message} 
            submit={this.submit}
            changed={this.changedHandler} 
            showFriends={this.state.isMobile ? false : true}
            showChat={true} /> }
            isMobile={this.state.isMobile} /> */}
          <Route path='/friends/:id' exact render={(routerProps) => 
            {
              let content1 = (
                <Redirect to='/auth' />
              )
              if(this.props.userAuthenticated) {
                content1 = (
                  <RootWrapper
                  // users={this.state.users}
                  {...routerProps}
                  // messages={this.state.messages} 
                  // message={this.state.message} 
                  submit={this.submit}
                  changed={this.changedHandler} 
                  showFriends={this.state.isMobile ? false : true}
                  showChat={true} />
                )
              }
              return (
                content1
              );
            } 
          } />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/search' component={SearchComp} />
          <Route path='/creategroup' exact component={CreateGroup} />
          {/* <Route path='/friends' exact render={(routerProps) =>
            <RootWrapper
            {...routerProps}
            // users={this.state.users}
            // messages={this.state.messages} 
            // message={this.state.message} 
            submit={this.submit}
            changed={this.changedHandler}
            showFriends={true}
            showChat={this.state.isMobile ? false : true} /> }
            isMobile={this.state.isMobile} /> */}
          <Route path='/friends' exact render={(routerProps) => 
            {
              let content2 = (
                <Redirect to='/auth' />
              )
              if(this.props.userAuthenticated) {
                content2 = (
                  <RootWrapper
                  {...routerProps}
                  // users={this.state.users}
                  // messages={this.state.messages} 
                  // message={this.state.message} 
                  submit={this.submit}
                  changed={this.changedHandler}
                  showFriends={true}
                  showChat={this.state.isMobile ? false : true} />
                )
              }
              return (
                content2
              );
            } 
          } />
          <Redirect to='/friends' />
        </Switch>
        {/* <RootWrapper
          users={this.state.users}
          messages={this.state.messages} 
          message={this.state.message} 
          submit={this.submit}
          changed={this.changedHandler} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    userAuthenticated: state.auth.userId !== null,
    username: state.auth.username,
    userId: state.auth.userId,
    currFriend: state.friends.currFriend,
    usernameSent: state.auth.usernameSent,
    friendsData: state.friends.friendsDict
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUserUpdateStatus: (data) => dispatch(actions.userStatusUpdate(data)),
    onSetMessages: (messages) => dispatch(actions.setMessages(messages)),
    onSetUsernameSent: () => dispatch(actions.setUsernameSent()),
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
    onAddFriendMessage: (message) => dispatch(actions.addFriendMessage(message)),
    onAddNewFriend: (friend) => dispatch(actions.addNewFriend(friend)),
    onAddFriendMessageStart: (idCurr,mess) => dispatch(actions.addFriendMessageStart(idCurr,mess)), 
    onReadMessages: (data) => dispatch(actions.readMessages(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
