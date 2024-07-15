import axios from 'axios';

export const userCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                authtoken,
            },
        },
    );

export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        {
            headers: {
                authtoken,
            },
        },
    );

export const saveUserPhone = async (authtoken, phone) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/phone`,
        { phone },
        {
            headers: {
                authtoken,
            },
        },
    );

export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        },
    );

export const updateOrder = async (authtoken, orderId, newGhnId) =>
    await axios.put(
        `${process.env.REACT_APP_API}/update-order/${orderId}`,
        { newGhnId },
        {
            headers: {
                authtoken,
            },
        },
    );

export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken,
            },
        },
    );

export const createGhnOrder = async (orderData) =>
    await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', orderData, {
        headers: {
            'Content-Type': 'application/json',
            ShopId: process.env.REACT_APP_GHN_SHOP_ID,
            Token: process.env.REACT_APP_GHN_API_KEY,
        },
    });

export const getGhnOrder = async (orderCode) =>
    await axios.post(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
        { order_code: orderCode },
        {
            headers: {
                'Content-Type': 'application/json',
                Token: process.env.REACT_APP_GHN_API_KEY,
            },
        },
    );

export const getDistrictGhnOrder = async () => {
    const requestData = {
        province_id: 201, // Replace with the actual province ID you want to query
    };

    try {
        const response = await axios.post(
            'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Token: process.env.GHN_API_KEY,
                },
            },
        );

        return response.data; // Assuming the response contains the data you need
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error; // Handle the error appropriately in your application
    }
};

export const getWardGhnOrder = async () => {
    const requestData = {
        district_id: 1566, // Replace with the actual district ID you want to query
    };

    try {
        const response = await axios.post(
            'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Token: process.env.GHN_API_KEY,
                },
            },
        );

        return response.data; // Assuming the response contains the ward data you need
    } catch (error) {
        console.error('Error fetching wards:', error);
        throw error; // Handle the error appropriately in your application
    }
};

export const trackOrder = async (orderCode, authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/track-order/${orderCode}`, {
        headers: {
            authtoken,
        },
    });

export const getGHNAddress = async (addressId, authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/address/${addressId}`, {
        headers: {
            authtoken,
        },
    });

export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken,
        },
    });

export const getUserLatestOrder = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/latest-order`, {
        headers: {
            authtoken,
        },
    });

export const getWishlist = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
            authtoken,
        },
    });

export const removeWishlist = async (productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authtoken,
            },
        },
    );

export const addToWishlist = async (productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`,
        { productId },
        {
            headers: {
                authtoken,
            },
        },
    );

export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`,
        { couponApplied: couponTrueOrFalse, COD },
        {
            headers: {
                authtoken,
            },
        },
    );
