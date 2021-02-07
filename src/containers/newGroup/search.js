import React,{Component} from 'react';
import classes from './search.module.css';
// import SearchItem from './searchItems/searchItem/searchItem';
import SearchItems from './searchItems/searchItems';
import axios from '../../axiosInstance';
import BackArrow from '../../components/UI/backArrow/backArrow'; 
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class CreateGroup extends Component {
    state = {
        searchTerm : '',
        searchedItems: []
    }

    componentDidMount() {
        let url = '/friendslist';
        axios.get(url)
            .then(response => {
                console.log(response.data);
                let tempList = response.data;
                const tempStateList = [...this.state.searchedItems];
                tempList.forEach(user => {
                    let obj = {
                        username: '',
                        userId: '',
                        checked: false
                    };
                    let indexNow = user.userData[0].userId === this.props.userId ? 1 : 0 ;
                    obj.username = user.userData[indexNow].username;
                    obj.userId = user.userData[indexNow].userId;
                    tempStateList.push(obj);
                });
                console.log('The creategroup list is ...');
                console.log(tempStateList);
                this.setState({searchedItems: tempStateList});
            })
            .catch(err => {
                console.log(err);
            })
    }

    clickHandler = (index) => {
        let tempList = [...this.state.searchedItems];
        let tempItem = {...tempList[index]};
        tempItem.checked = !tempItem.checked;
        tempList[index] = tempItem;
        this.setState({searchedItems: tempList});
    }

    filterAddedFriend = (friendId) => {
        const tempList = this.state.searchedItems.filter(item => {
            return item._id !== friendId;
        });
        this.setState({
            searchedItems: tempList
        });
    }

    setSearchTerm = (searchTerm) => {
        this.setState({searchTerm: searchTerm});
    }
    submitHandler = event => {
        event.preventDefault();
        let url = '/creategroup';
        let tempArr = [];
        tempArr = this.state.searchedItems.filter(user => {
            return user.checked === true;
        });
        console.log('array to be submitted is ...');
        console.log(tempArr);
        const tempObject = {};
        tempObject.users = tempArr;
        tempObject.name = this.state.searchTerm;
        // console.log(tempObject);
        axios.post(url,tempObject)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
        this.setSearchTerm('');
    }
    changedHandler = (event) => {
        this.setSearchTerm(event.target.value);
    }

    render() {
        return (
            <div className={classes.RootDiv}>
                <div className={classes.inputWrap}>
                    <div className={classes.writingArea}>
                        <div className={classes.Icon}>
                            <Link to='/'>
                                <BackArrow />
                            </Link>
                        </div>
                        <div className={classes.noIcon}>
                            <form onSubmit={this.submitHandler} > 
                                    <input onChange={this.changedHandler} value={this.state.searchTerm} placeholder='Group Name' />
                                    <button>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className={classes.GroupName}>
                        <h1>
                            {this.state.searchTerm}
                        </h1>
                    </div>
                    <div className={classes.searchItems}>
                        {/* <SearchItem username='Default Username' email='default@gmai.com' /> */}
                        <SearchItems list={this.state.searchedItems}
                         filterItem={this.filterAddedFriend}
                         clickHandler={this.clickHandler}/>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(CreateGroup);