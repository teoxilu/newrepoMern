import { lazy } from 'react';

import config from '~/config';

// Pages
const Home = lazy(() => import('~/pages/Home'));
const Login = lazy(() => import('~/pages/auth/Login'));
const Register = lazy(() => import('~/pages/auth/Register'));
const RegisterComplete = lazy(() => import('~/pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('~/pages/auth/ForgotPassword'));
const History = lazy(() => import('~/pages/user/History'));
const UserRoute = lazy(() => import('~/components/routes/UserRoute'));
const AdminRoute = lazy(() => import('~/components/routes/AdminRoute'));
const Password = lazy(() => import('~/pages/user/Password'));
const Wishlist = lazy(() => import('~/pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('~/pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('~/pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('~/pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('~/pages/admin/sub/SubCreate'));
const ProductCreate = lazy(() => import('~/pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('~/pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('~/pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('~/pages/Product'));
const SubHome = lazy(() => import('~/pages/sub/SubHome'));
const Shop = lazy(() => import('~/pages/Shop'));
const Cart = lazy(() => import('~/pages/Cart'));
const Checkout = lazy(() => import('~/pages/Checkout'));
const CreateCouponPage = lazy(() => import('~/pages/admin/coupon/CreateCouponPage'));
const Payment = lazy(() => import('~/pages/Payment'));
const SubUpdate = lazy(() => import('~/pages/admin/sub/SubUpdate'));

const publicRoutes = [
    // Default Route
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.registerComplete, component: RegisterComplete },
    { path: config.routes.forgotPassword, component: ForgotPassword },
    { path: config.routes.product, component: ForgotPassword },
    { path: config.routes.category, component: Product },
    { path: config.routes.subcategory, component: SubHome },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.payment, component: Payment },

    // User Route
    { path: config.routes.history, component: History, customRoute: UserRoute },
    { path: config.routes.password, component: Password, customRoute: UserRoute },
    { path: config.routes.wishList, component: Wishlist, customRoute: UserRoute },

    // Admin Route
    { path: config.routes.adminDashboard, component: AdminDashboard, customRoute: AdminRoute },
    { path: config.routes.adminCategory, component: CategoryCreate, customRoute: AdminRoute },
    { path: config.routes.adminCategoryUpdate, component: CategoryUpdate, customRoute: AdminRoute },
    { path: config.routes.adminSubCreate, component: SubCreate, customRoute: AdminRoute },
    { path: config.routes.adminSubUpdate, component: SubUpdate, customRoute: AdminRoute },
    { path: config.routes.adminProductCreate, component: ProductCreate, customRoute: AdminRoute },
    { path: config.routes.adminProductUpdate, component: ProductUpdate, customRoute: AdminRoute },
    { path: config.routes.adminAllProducts, component: AllProducts, customRoute: AdminRoute },
    { path: config.routes.adminCoupon, component: CreateCouponPage, customRoute: AdminRoute },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
