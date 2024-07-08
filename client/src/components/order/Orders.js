import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import numeral from 'numeral';

const Orders = ({ orders, handleStatusChange }) => {
    const showOrderInTable = (order) => (
        <table className="table table-bordered mt-2">
            <thead className="thead-light text-center">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Size</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td className="w-[20%]" style={{ verticalAlign: 'middle' }}>
                            <b>{p.product.title}</b>
                        </td>
                        <td className="w-[20%]" style={{ verticalAlign: 'middle' }}>
                            {numeral(p.product.price).format('0,0')}
                        </td>
                        <td className="w-[20%]" style={{ verticalAlign: 'middle' }}>
                            {p.product.brand}
                        </td>
                        <td className="w-[20%]" style={{ verticalAlign: 'middle' }}>
                            {p.size}
                        </td>
                        <td className="w-[20%]" style={{ verticalAlign: 'middle' }}>
                            {p.count}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row pb-5 mt-4">
                    <div className="btn btn-block bg-light">
                        <ShowPaymentInfo order={order} showStatus={false} />

                        <div className="flex items-center justify-between row py-3 border-t border-b border-light-outline-variant">
                            <div className="col-md-4">Delivery Status</div>
                            <div className="col-md-8">
                                <select
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface focus:text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                                    defaultValue={order.orderStatus}
                                    name="status"
                                >
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cash On Delivery">Cash On Delivery</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {showOrderInTable(order)}
                </div>
            ))}
        </>
    );
};

export default Orders;
