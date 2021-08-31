import React, {useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";

import './Pages.css';

const Pages = ({match}) => {
    const [page, setPage] = useState('');

    useEffect(() => {
        (async () => {
            const page = await getPage();
            setPage(page);
        })();
    }, [match.params.id]);

    const getPage = async () => {
        const response = await axiosApi('/pages/' + match.params.id + '.json');
        return response.data;
    };

    return (
        <div className="Page">
            <h2 className="Title">{page.title}</h2>
            <p className="Content">{page.content}</p>
        </div>
    );
};

export default Pages;