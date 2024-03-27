import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { IconButton, Spinner } from '@material-tailwind/react';
import { useDebounce } from '~/hooks';

function SearchBar() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    var { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    // const debouncedValue = useDebounce(text, 700);
    const inputRef = useRef();

    const handleClear = () => {
        inputRef.current.valueOf().value = '';
        inputRef.current.focus();
    };

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

    // useEffect(() => {
    //     if (!debouncedValue.trim()) {
    //         return;
    //     }

    //     setLoading(true);

    //     setLoading(false);
    // }, [debouncedValue, handleChange]);
    return (
        <form
            className="max-w-[360px] w-full flex justify-between p-2 items-center space-x-2 border rounded-full bg-light-surface-container-high focus-within:border-light-secondary-container"
            onSubmit={handleSubmit}
        >
            <input
                ref={inputRef}
                onChange={handleChange}
                type="text"
                value={text}
                spellCheck={false}
                className="pl-2 text-base text-light-on-surface outline-none w-full bg-transparent"
                placeholder="Nike"
            />
            <div className="flex items-center">
                {!!text && !loading && (
                    <IconButton variant="text" className="rounded-full" onClick={handleClear}>
                        <XCircleIcon className="h-6 w-6 text-light-on-surface" />
                    </IconButton>
                )}
                {loading && <Spinner className="h-6 w-6" />}
                <IconButton variant="text" className="rounded-full" onClick={handleSubmit}>
                    <MagnifyingGlassIcon className="h-6 w-6 text-light-on-surface" />
                </IconButton>
            </div>
        </form>
    );
}

export default SearchBar;
