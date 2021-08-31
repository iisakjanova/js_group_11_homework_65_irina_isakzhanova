import React from 'react';

import Toolbar from "../../Navigation/Toolbar/Toolbar";

const Layout = ({children}) => {
    return (
        <div className="layout">
            <Toolbar />
            <main className="Layout-Content">
                {children}
            </main>
        </div>
    );
};

export default Layout;