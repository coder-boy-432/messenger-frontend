import React,{Component} from 'react';
import classes from './userDashboard.module.css';
import Search from '../../../components/UI/Search/search';
import {Link} from 'react-router-dom';
import Plus from '../../../components/UI/plus/plus';

class UserDashboard extends Component {
    render() {
        return (
            <div className={classes.userDashboard}>
                <div className={classes.name}>{this.props.name}</div>
                <div className={classes.searchIcon}>
                    <Link to='/search'>
                        <Search />
                    </Link>
                </div>
                <div className={classes.searchIcon}>
                    <Link to='/creategroup'>
                        <Plus />
                    </Link>
                </div>
            </div>
        );
    };
};

export default UserDashboard;