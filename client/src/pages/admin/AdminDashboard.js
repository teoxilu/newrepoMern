import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';
import { SpinnerIcon } from '~/components/Icons';
import StickyHeader from '~/components/StickyHeader';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        setLoading(true);
        getOrders(user.token).then((res) => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
            setLoading(false);
        });
    };

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success('Status updated');
            loadOrders();
        });
    };

    return (
       <>
       <StickyHeader isAdmin/>
            <div className="container-fluid pt-28">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
    
                    <div className="">
                        <h1 className="font-medium text-base text-left">Admin Dashboard</h1>
                        <hr className="text-light-outline-variant" />
                        {/* {JSON.stringify(orders)} */}
                        {loading ? (
                            <div className="flex items-center space-x-2 mt-4">
                                <SpinnerIcon />
                                <p className="font-medium text-base text-left text-light-primary">Loading...</p>
                            </div>
                        ) : (
                            <Orders orders={orders} handleStatusChange={handleStatusChange} />
                        )}
                    </div>
                </div>
            </div>
       </>
    );
};

export default AdminDashboard;
