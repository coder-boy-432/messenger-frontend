import React,{Component} from 'react';
import classes from './searchItem.module.css';
import axios from '../../../../axiosInstance';
import Icon from '../../../../components/UI/CheckBox/checkbox';

class searchItem extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        const friend = {
            username: this.props.username,
            friendId: this.props.userId
        }
        let url = '/addfriend';
        // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        // url = proxyurl + url;
        axios.post(url,friend)
            .then(response => {
                console.log('Friend created');
                console.log(response.data);
                this.props.filterItem(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const checkBox = (
            <div className={classes.Icon}>
                <Icon isChecked={this.props.checked} />
            </div>
        );
        return (
            <div className={classes.searchItem} onClick={this.props.clicked}>
                {checkBox}
                <div>
                    <div><h2>{this.props.username}</h2></div>
                    <div>{this.props.email}</div>
                </div>
                {/* <form onSubmit={this.submitHandler}>
                    <button>Add Friend</button>
                </form> */}
            </div>
        );
    };
};

export default searchItem;