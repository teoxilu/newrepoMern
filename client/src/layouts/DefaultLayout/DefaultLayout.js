import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';

import StickyHeader from '~/components/StickyHeader';
const Header = lazy(() => import('~/components/nav/Header'));
const SideDrawer = lazy(() => import('~/components/drawer/SideDrawer'));

function DefaultLayout({ children }) {
    return (
        <div>
            <StickyHeader />
            {/* <Header /> */}
            <SideDrawer />
            <ToastContainer />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
