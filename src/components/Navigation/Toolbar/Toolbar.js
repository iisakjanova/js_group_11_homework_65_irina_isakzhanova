import React from 'react';

import NavigationItems from "../NavigationItems/NavigationItems";
import './Toolbar.css';

const Toolbar = () => {
    return (
        <header className="Toolbar">
            <h2>
                Static pages
            </h2>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;