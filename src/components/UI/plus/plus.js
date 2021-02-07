import React from 'react';
import classes from './plus.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const plus = () => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
    </div>
);
export default plus;