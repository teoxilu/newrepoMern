import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { IconButton, Spinner } from '@material-tailwind/react';
import { useDebounce } from '~/hooks';

function SearchBar() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    var { search } = useSelector((state) => ({ ...state }));
    const [textValue,setTextValue] = useState(search.text);
    // const debouncedValue = useDebounce(text, 700);
    const inputRef = useRef();

    const handleClear = () => {
        setTextValue('')
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        inputRef.current.focus();
    };

    const history = useHistory();

    const handleChange = (e) => {
        setTextValue(e.target.value)
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${textValue}`);
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
            className="max-w-[360px] w-full flex justify-between p-2 items-center space-x-2 border !border-light-outline rounded-full bg-light-surface-container-medium focus-within:border-light-secondary-container"
            onSubmit={handleSubmit}
        >
            <input
                ref={inputRef}
                onChange={handleChange}
                type="text"
                value={textValue}
                spellCheck={false}
                className="pl-2 text-base text-light-on-surface outline-none placeholder:text-light-on-surface-variant/75 w-full bg-transparent"
                placeholder="Nike"
            />
            <div className="flex items-center">
                {!!textValue && !loading && (
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
