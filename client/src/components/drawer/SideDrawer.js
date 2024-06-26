import React from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import unknown from '../../images/unknown.jpg';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const bottomNavbar = document.getElementById('bottomNavbar');
    const heightBottomNavbar = bottomNavbar?.offsetHeight;


    return (
        <Drawer
            className="text-center h-screen text-light-on-surface"
            title={`Cart / ${cart.length} Product(s)`}
            placement="right"
            onClose={() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false,
                });
            }}
            visible={drawer}
        >
            {/* Items Container */}
            <div className={`h-full`}>
                {cart.map((p, index) => {
                  const isLast = index === cart.length-1;
                  const classes = isLast ? `pb-[${heightBottomNavbar + 20}px]` : undefined
                    return (
                        <div key={p._id} className={`row w-full ${classes}`}>
                            <div className="flex items-center">
                                {p.images[0] ? (
                                    <img
                                        src={p.images[0].url}
                                        alt={p.title}
                                        className="object-cover w-1/2 h-auto rounded-lg"
                                    />
                                ) : (
                                    <img src={unknown} alt={p.title} className="object-cover w-1/2 h-auto rounded-lg" />
                                )}
                                <div className="w-full flex flex-col space-y-2 items-end">
                                    <p className='text-light-on-surface'>{p.title}</p>
                                    <p className='text-light-primary'>x{p.count}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                id="bottomNavbar"
                className="absolute bottom-0 w-full mx-[-20px] h-20 px-2 py-3 shadow-inner border-t border-light-outline bg-light-surface-container-lowest"
            >
                <Link to="/cart">
                    <Button
                        size="lg"
                        onClick={() =>
                            dispatch({
                                type: 'SET_VISIBLE',
                                payload: false,
                            })
                        }
                        fullWidth
                        className="bg-light-primary m-auto"
                    >
                        Go to Cart
                    </Button>
                </Link>
            </div>
        </Drawer>
    );
};

export default SideDrawer;
