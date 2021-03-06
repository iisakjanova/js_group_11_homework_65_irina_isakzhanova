import React, {useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";

import Spinner from "../../components/UI/Spinner/Spinner";
import './Pages.css';

const Pages = ({match}) => {
    const [page, setPage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const page = await getPage();
                setPage(page);

            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [match.params.id]);

    const getPage = async () => {
        const id = match.params.id || 'about';
        const response = await axiosApi('/pages/' + id + '.json');
        return response.data;
    };

    return (
        loading
            ?
            <Spinner />
            :
            <div className="Page">
                <h2 className="Title">{page.title}</h2>
                <div className="Content" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
    );
};

export default Pages;