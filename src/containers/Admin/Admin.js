import React, {useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";

import Spinner from "../../components/UI/Spinner/Spinner";
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

    const handleInputChange = e => {
        const {name, value} = e.target;
        setSelectedPageInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        loading
            ?
            <Spinner />
            :
            <div className="Page Admin">
                <h2>Edit pages</h2>
                <form>
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
                    <label>
                        <p>Title</p>
                        <input
                            type="text"
                            name="title"
                            value={selectedPageInfo.title || ''}
                            onChange={e => handleInputChange(e)}
                        />
                    </label>
                    <label>
                        <p>Content</p>
                        <textarea
                            name="content"
                            value={selectedPageInfo.content || ''}
                            onChange={e => handleInputChange(e)}
                        />
                    </label>
                    <button>Save</button>
                </form>
            </div>
    );
};

export default Admin;