import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchOutlined } from '@ant-design/icons';
import { IconButton } from '@material-tailwind/react';

function SearchBar() {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate.push(`/shop?${text}`);
    };
    return (
        <form
            className="max-w-[360px] w-full flex justify-between p-2 items-center space-x-2 border rounded-full bg-light-surface-container-high focus-within:border-light-secondary-container"
            onSubmit={handleSubmit}
        >
            <input
                onChange={handleChange}
                type="text"
                value={text}
                spellCheck={false}
                className="pl-2 text-base text-light-on-surface outline-none w-full bg-transparent"
                placeholder="Nike"
            />
            <IconButton variant="text" className="rounded-full">
                <MagnifyingGlassIcon className="h-6 w-6 text-light-on-surface" />
            </IconButton>
        </form>
    );
}

export default SearchBar;
