import React from 'react';

import { splitCamelCase } from "../../../util/string";
import styles from './NotAvailable.module.scss';

const NotAvailable = ({
    itemNotAvailable
}) => {
    const splitItem = splitCamelCase(itemNotAvailable);

    return (
        <span className={styles.notAvailable}>
            <span>
                <span className={styles.notAvailable__item}>{splitItem}</span>&nbsp;data not available.
            </span>
        </span>
    );
};

export default NotAvailable;