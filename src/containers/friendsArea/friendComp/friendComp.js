import React,{Component} from 'react';
import classes from './friendComp.module.css';
import Dot from '../../../components/UI/dot/dot';

class friendComp extends Component {
    render() {
        let UnreadDiv = null;
        if(this.props.unread > 0) {
            UnreadDiv = (
                <div className={classes.Unread}><div className={classes.UnreadInner}>{this.props.unread}</div></div>
            );
        }
        return (
            <div className={classes.friendComp} >
                <div className={classes.friendName}>
                    <div className={classes.searchIcon}>
                        <Dot online={this.props.online} />
                    </div>
                    <div className={classes.Name}><p>{this.props.name}</p></div>
                    {UnreadDiv}
                </div>
                <div>message here</div>
            </div>
        )
    }
}

export default friendComp;