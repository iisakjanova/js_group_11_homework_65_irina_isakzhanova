import React, {useEffect, useState,} from 'react';
import axiosApi from "../../axiosApi";
import {useHistory} from "react-router-dom";
import ReactQuill from 'react-quill';

import Spinner from "../../components/UI/Spinner/Spinner";
import 'react-quill/dist/quill.snow.css';
import './Admin.css';

const Admin = () => {
    const [pages, setPages] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
    const [selectedPageInfo, setSelectedPageInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const pages = await getPages();
            setPages(pages);
        })();
    }, []);

    const history = useHistory();

    const getPages = async () => {
        const response = await axiosApi.get('pages.json');
        return response.data;
    };

    const getCurrentPage = async id => {
        const response = await axiosApi.get('/pages/' + id + '.json');
        return response.data;
    };

    const handleSelectChange = async e => {
        setSelectedPage(e.target.value);
        setLoading(true);

        try {
            const data = await getCurrentPage(e.target.value);
            setSelectedPageInfo(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = e => {
        const {name, value} = e.target;
        setSelectedPageInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContentChange = value => {
        setSelectedPageInfo(prev => ({
            ...prev,
            content: value
        }));
    };

    const sendUpdatePageRequest = async () => {
        await axiosApi.put('/pages/' + selectedPage + '.json', {
            title: selectedPageInfo.title,
            content: selectedPageInfo.content
        });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendUpdatePageRequest();
            history.replace('/pages/' + selectedPage);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        loading
            ?
            <Spinner />
            :
            <div className="Page Admin">
                <h2 className="Title">Edit pages</h2>
                <form onSubmit={e => handleFormSubmit(e)}>
                    <label>
                        <p>Select page</p>
                        <select
                            value={selectedPage}
                            onChange={e => handleSelectChange(e)}
                        >
                            <option disabled key="empty" name="page"/>
                            {Object.keys(pages).map(key => (
                                <option
                                    key={key}
                                    name="page"
                                    value={key}
                                >
                                    {pages[key].title}
                                </option>
                            ))}
                        </select>
                    </label>
                    {selectedPage
                        ?
                        <>
                            <label>
                                <p>Title</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={selectedPageInfo.title || ''}
                                    onChange={e => handleTitleChange(e)}
                                />
                            </label>
                            <label>
                                <p>Content</p>
                                <ReactQuill
                                    theme="snow"
                                    value={selectedPageInfo.content || ''}
                                    onChange={value => handleContentChange(value)}
                                />
                            </label>
                            <button>Save</button>
                        </>
                        :
                        null}
                </form>
            </div>
    );
};

export default Admin;