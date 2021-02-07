import React,{Component} from 'react';
import SearchItem from './searchItem/searchItem';
import classes from './searchItems.module.css';

class searchItems extends Component {
    render() {
        const searchlist = this.props.list;
        const items = searchlist.map(item => {
            return <SearchItem userId={item._id} username={item.username} email={item.email} key={item._id} filterItem={this.props.filterItem}/>
        });
        return (
            <div className={classes.searchItems}>
                {items}
            </div>
        );
    };
};

export default searchItems;