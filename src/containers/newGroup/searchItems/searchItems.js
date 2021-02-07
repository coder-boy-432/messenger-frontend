import React,{Component} from 'react';
import SearchItem from './searchItem/searchItem';
import classes from './searchItems.module.css';

class searchItems extends Component {
    render() {
        const searchlist = this.props.list;
        const items = searchlist.map((item,index) => {
            return <SearchItem userId={item._id}
                     username={item.username}
                     clicked={() => this.props.clickHandler(index)}
                     key={item.userId}
                     checked={item.checked}
                     filterItem={this.props.filterItem}/>
        });
        return (
            <div className={classes.searchItems}>
                {items}
            </div>
        );
    };
};

export default searchItems;