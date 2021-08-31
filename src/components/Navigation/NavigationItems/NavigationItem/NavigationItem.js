import React from 'react';
import {NavLink} from "react-router-dom";

import "./NavigationItem.css";

const NavigationItem = ({to, children}) => {
    return (
        <li className="NavigationItem">
            <NavLink to={to}>{children}</NavLink>
        </li>
    );
};

export default NavigationItem;