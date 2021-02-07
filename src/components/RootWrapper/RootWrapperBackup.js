import React,{Component} from 'react';
import classes from './RootWrapper.module.css';
import MessageArea from '../../containers/messageArea/messageArea';
import FriendsArea from '../../containers/friendsArea/friendsArea';

class RootWrapper extends Component {
    render() {
        let idToPass = null;
        console.log('RootWrapper says ... ');
        console.log(this.props.match.params.id);
        if(this.props.match.params.id !== undefined){
            idToPass = this.props.match.params.id
        };
        const isMobile = !(this.props.showFriends && this.props.showChat);
        const friendsArea = this.props.showFriends ? <FriendsArea users={this.props.users}
                                                        isMobile={isMobile}
                                                        history={this.props.history} /> : null; 
        const messageArea = this.props.showChat ? <MessageArea 
                                                    messages={this.props.messages} 
                                                    message={this.props.message} 
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

export default RootWrapper;