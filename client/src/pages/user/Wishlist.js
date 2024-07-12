import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import DelDialog from './DelDialog';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            setWishlist(res.data.wishlist);
        });
    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });
    };

    // const handleRemove = (productId) => {
    //     const confirmed = window.confirm('Do you want to remove this item from wishlist?');
    //     if (confirmed) {
    //         removeWishlist(productId, user.token).then(() => {
    //             loadWishlist();
    //         });
    //     }
    // };

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        <div className="container-fluid pt-28 text-light-on-surface">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h1 className="font-medium text-base">Wishlist</h1>

                    <div className="flex flex-col space-y-4 mt-4">
                        {wishlist?.map((p) => (
                                <DelDialog handleRemove={handleRemove} p={p} title={p.title}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
