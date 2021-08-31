import React, {useEffect, useState} from 'react';
import axiosApi from "../../../axiosApi";

import NavigationItem from "./NavigationItem/NavigationItem";
import './NavigationItems.css';

const NavigationItems = () => {
    const [pageTitles, setPageTitles] = useState('');

    useEffect(() => {
        (async () => {
            const data = await getPages();
            const pageTitles = {};

            Object.keys(data).forEach(key => {
                const {content, ...rest} = data[key];
                pageTitles[key] = rest;
            });
            setPageTitles(pageTitles);
        })();
    }, []);

    const getPages = async () => {
        const response = await axiosApi.get('/pages.json');
        return response.data;
    };

    return (
        <ul className="NavigationItems">
            {Object.keys(pageTitles).map(item => (
                <NavigationItem
                    key={item}
                    to={'/pages/' + item}
                >
                    {pageTitles[item].title}
                </NavigationItem>
            ))}
            <NavigationItem to="/pages/admin">Admin</NavigationItem>
        </ul>
    );
};

export default NavigationItems;