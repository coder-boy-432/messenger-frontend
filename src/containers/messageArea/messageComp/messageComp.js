import React,{Component} from 'react';
import classes from './messageComp.module.css';
import Tick from '../../../components/UI/tick/tick';

class messageComp extends Component {
    render() {
        let direction = null;
        if(this.props.owner === 'sender'){
            // direction = 'right';
            direction = classes.messageCompR;
        } else {
            // direction = 'left';
            direction = classes.messageCompL;
        }
        return (
            <div className={classes.contain}>
                <div className={direction}>
                    <div>
                        {this.props.children}
                    </div>
                    <div className={classes.Icon}>
                        <Tick read={this.props.read} />
                    </div>
                </div>
            </div>
            
        )
    }
}

export default messageComp;