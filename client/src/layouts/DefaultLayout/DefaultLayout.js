import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition={Bounce}
            />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
