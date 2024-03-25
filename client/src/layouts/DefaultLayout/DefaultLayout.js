import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';

import StickyHeader from '~/components/StickyHeader';
import Footer from '~/components/Footer';
const Header = lazy(() => import('~/components/nav/Header'));
const SideDrawer = lazy(() => import('~/components/drawer/SideDrawer'));
function DefaultLayout({ children }) {
    return (
        <div>
            <StickyHeader />
            {/* <Header /> */}
            <SideDrawer />
            <ToastContainer />
            <div className="bg-light-surface">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
