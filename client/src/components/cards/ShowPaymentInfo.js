import { Chip } from '@material-tailwind/react';
import numeral from 'numeral';
import React from 'react';

const ShowPaymentInfo = ({ order, showStatus = true }) => (
    <div className="p-2 flex flex-col justify-center items-start space-y-2">
        <div className="flex items-center space-x-5">
            <p>
                <span className="text-light-on-surface-variant">Order Id:</span> <b>{order._id}</b>
            </p>
            <p>
                <span className="text-light-on-surface-variant">Ordered on:</span>{' '}
                <b>{new Date(order.paymentIntent.created * 1000).toLocaleString()}</b>
            </p>
        </div>
        <div className="flex items-center space-x-5">
            <p>
                <span className="text-light-on-surface-variant">Payment Method:</span>{' '}
                <b>{order.paymentIntent.status.toUpperCase()}</b>
            </p>
            <p>
                <span className="text-light-on-surface-variant">Total amount:</span>{' '}
                <b className="text-light-primary">
                    {numeral(order.paymentIntent.amount).format('0,0')} {order.paymentIntent.currency.toUpperCase()}
                </b>
            </p>
        </div>
        <div>
            {showStatus && (
                <Chip
                    variant="outlined"
                    className="text-light-primary border !border-light-primary"
                    value={`STATUS: ${order.orderStatus}`}
                />
            )}
        </div>
        {/* <p>
      <span>Order Id: {order._id}</span>
      {" / "}
      <span>
        Amount:{" / "}
        {order.paymentIntent.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Ordered on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p> */}
    </div>
);

export default ShowPaymentInfo;
