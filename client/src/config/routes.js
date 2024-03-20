const routes = {
    // Default Route
    home: '/',
    login: '/login',
    register: '/register',
    registerComplete: '/register/complete',
    forgotPassword: '/forgot/password',
    product: '/product/:slug',
    category: '/category/:slug',
    subcategory: '/sub/:slug',
    shop: '/shop',
    cart: '/cart',
    checkout: '/checkout',
    payment: '/payment',

    // User Route
    history: '/user/history',
    password: '/user/password',
    wishList: '/user/wishlist',

    // Admin Route
    adminDashboard: '/admin/dashboard',
    adminCategory: '/admin/category',
    adminCategoryUpdate: '/admin/category/:slug',
    adminSubCreate: '/admin/sub',
    adminSubUpdate: '/admin/sub/:slug',
    adminProductCreate: '/admin/product',
    adminProductUpdate: '/admin/product/:slug',
    adminAllProducts: '/admin/products',
    adminCoupon: '/admin/coupon',
};

export default routes;
