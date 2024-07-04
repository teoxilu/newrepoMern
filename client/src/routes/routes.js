import { lazy } from 'react';

import config from '~/config';

// Pages
// import Test from '~/pages/Test';
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
const CategoryHome = lazy(() => import('~/pages/category/CategoryHome'));
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
const Test = lazy(() => import('~/pages/Test'));

const defaultRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.registerComplete, component: RegisterComplete },
    { path: config.routes.forgotPassword, component: ForgotPassword },
    { path: config.routes.product, component: Product },
    { path: config.routes.category, component: CategoryHome },
    { path: config.routes.subcategory, component: SubHome },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.test, component: Test, layout: null },
    { path: config.routes.history, component: History },
];
const userRoutes = [
    { path: config.routes.history, component: History, customRoute: UserRoute, layout: null },
    { path: config.routes.password, component: Password, customRoute: UserRoute, layout: null },
    { path: config.routes.wishList, component: Wishlist, customRoute: UserRoute, layout: null },
];
const adminRoutes = [
    { path: config.routes.adminDashboard, component: AdminDashboard, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminCategory, component: CategoryCreate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminCategoryUpdate, component: CategoryUpdate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminSubCreate, component: SubCreate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminSubUpdate, component: SubUpdate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminProductCreate, component: ProductCreate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminProductUpdate, component: ProductUpdate, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminAllProducts, component: AllProducts, customRoute: AdminRoute, layout: null },
    { path: config.routes.adminCoupon, component: CreateCouponPage, customRoute: AdminRoute, layout: null },
];

const privateRoutes = [];

export { defaultRoutes, userRoutes, adminRoutes, privateRoutes };
