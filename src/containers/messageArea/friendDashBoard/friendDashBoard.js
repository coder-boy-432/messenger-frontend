import React,{ Component } from 'react';
// import {Link} from 'react-router-dom';
import classes from './friendDashBoard.module.css';
import {Link} from 'react-router-dom';
import BackArrow from '../../../components/UI/backArrow/backArrow';

class  friendDashBoard extends Component {
    render() {
        return (
            <div className={classes.friendDashBoard}>
                <div className={classes.Icon} >
                    <Link to='/'>
                        <BackArrow />
                    </Link>
                </div>
                <div className={classes.noIcon}>
                    <div className={classes.friendName}><p>{this.props.name}</p></div>
                    <div className={classes.onlineStatus}>{this.props.online}</div>
                </div>
            </div>
        );
    }
}

export default friendDashBoard