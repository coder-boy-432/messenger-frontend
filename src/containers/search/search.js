import React,{Component} from 'react';
import classes from './search.module.css';
// import SearchItem from './searchItems/searchItem/searchItem';
import SearchItems from './searchItems/searchItems';
import axios from '../../axiosInstance';
import BackArrow from '../../components/UI/backArrow/backArrow'; 
import { Link } from 'react-router-dom';

class Search extends Component {
    state = {
        searchTerm : '',
        searchedItems: []
    }
    filterAddedFriend = (data) => {
        const tempList = this.state.searchedItems.filter(item => {
            return item._id !== data.friendId;
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
        let url = '/search';
        axios.post(url,{searchTerm: this.state.searchTerm})
            .then(response => {
                console.log(response.data);
                this.setState({searchedItems: response.data});
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
                                    <input onChange={this.changedHandler} value={this.state.searchTerm} />
                                    <button>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className={classes.searchItems}>
                        {/* <SearchItem username='Default Username' email='default@gmai.com' /> */}
                        <SearchItems list={this.state.searchedItems} filterItem={this.filterAddedFriend}/>
                    </div>
                </div>
            </div>
        );
    };
};

export default Search;