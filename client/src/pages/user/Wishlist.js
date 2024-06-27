import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Dialog, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const { user } = useSelector((state) => ({ ...state }));

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then(() => {
            loadWishlist();
        });
    };

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
                            <div
                                key={p._id}
                                className="flex items-center justify-between bg-light-tertiary-container text-light-on-tertiary-container/85 px-2 py-2 rounded-lg"
                            >
                                <Link
                                    to={`/product/${p.slug}`}
                                    className="hover:text-light-on-tertiary-container transition-opacity"
                                >
                                    {p.title}
                                </Link>
                                <IconButton onClick={handleOpen} variant="text" className="rounded-full">
                                    <DeleteOutlined className="text-light-on-tertiary-container" />
                                </IconButton>
                                <Dialog open={open} handler={handleOpen}>
                                    <DialogHeader>Do you want to remove this item from wishlist?</DialogHeader>
                                    <DialogFooter className="flex items-center space-x-2">
                                        <Button
                                            variant="text"
                                            className="rounded-full text-light-primary hover:bg-light-primary/8 transition-colors"
                                            onClick={handleOpen}
                                        >
                                            No
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleRemove(p.id);
                                                handleOpen();
                                            }}
                                            className="rounded-full bg-light-primary text-light-on-primary"
                                        >
                                            Yes
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
