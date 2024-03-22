import { useState, useEffect } from 'react';
import { Navbar, MobileNav, Button, IconButton, Badge } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

import config from '~/config';
import SearchBar from '~/components/SearchBar';
import images from '~/images';
import ProfileMenu from '~/components/ProfileMenu';

function StickyHeader() {
    const [openNav, setOpenNav] = useState(false);
    const [current, setCurrent] = useState('home');

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let navigate = useNavigate();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate.push(config.routes.login);
    };
    useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link to={config.routes.shop}>
                <Button
                    variant="text"
                    className="rounded-full text-light-on-surface hover:text-light-primary hover:bg-light-primary/8"
                >
                    Shop
                </Button>
            </Link>
        </ul>
    );

    return (
        <Navbar className="sticky top-0 z-50 h-max max-w-full w-full rounded-none px-4 py-2 lg:px-40 lg:py-4 bg-light-surface">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="Logo" className="h-auto max-w-full w-44 z-50" />
                </Link>
                <SearchBar />
                <div className="flex items-center space-x-5">
                    {/* NavList */}
                    <div className="hidden lg:block">{navList}</div>

                    {/* Icon Cart */}
                    <Link to={config.routes.cart}>
                        <IconButton
                            variant="text"
                            className="rounded-full text-light-on-surface-variant hover:bg-light-on-surface-variant/8"
                        >
                            <Badge content={cart.length} withBorder>
                                <ShoppingCartIcon className="w-6 h-6" />
                            </Badge>
                        </IconButton>
                    </Link>

                    {/* Register/ Login */}
                    {!user && (
                        <>
                            <Link to={config.routes.register}>
                                <Button
                                    variant="outlined"
                                    className="hidden lg:inline-block rounded-full border-light-outline hover:bg-light-primary/8"
                                >
                                    <span className="text-light-primary">Register</span>
                                </Button>
                            </Link>
                            <Link to={config.routes.login}>
                                <Button
                                    ripple
                                    className="hidden lg:inline-block rounded-full bg-light-primary 
                                "
                                >
                                    <span className="text-light-on-primary hover:bg-light-on-primary/8">Log in</span>
                                </Button>
                            </Link>
                        </>
                    )}

                    {user && <ProfileMenu onClick={logout} loginStatus={user} />}
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">
                    {!user && (
                        <>
                            <Link to={config.routes.register}>
                                <Button
                                    variant="outlined"
                                    className="hidden lg:inline-block rounded-full border-light-outline hover:bg-light-primary/8"
                                >
                                    <span className="text-light-primary">Register</span>
                                </Button>
                            </Link>
                            <Link to={config.routes.login}>
                                <Button
                                    ripple
                                    className="hidden lg:inline-block rounded-full bg-light-primary 
                                "
                                >
                                    <span className="text-light-on-primary hover:bg-light-on-primary/8">Log in</span>
                                </Button>
                            </Link>
                        </>
                    )}
                    {user && <ProfileMenu onClick={logout} loginStatus={user} />}
                </div>
            </MobileNav>
        </Navbar>
    );
}

export default StickyHeader;
