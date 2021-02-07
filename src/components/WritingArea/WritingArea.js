import React,{Component} from 'react';
import classes from './writingArea.module.css';

class writingArea extends Component {
    render() {
        return (
            <form onSubmit={this.props.submit} > 
                <div className={classes.writingArea}>
                    <input onChange={this.props.changed} value={this.props.message} />
                    <button>Submit</button>
                </div>
            </form>
        );
    }
}

export default writingArea;