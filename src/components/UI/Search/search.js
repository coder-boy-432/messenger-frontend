import React from 'react';
import classes from './search.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const search = () => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={faSearch} size='2x' />
    </div>
);
export default search;