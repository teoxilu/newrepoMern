import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// const adminTabs = [
//     { id: 1, name: 'Dashboard' },
//     { id: 2, name: 'Product' },
//     { id: 3, name: 'Products' },
//     { id: 4, name: 'Category' },
//     { id: 5, name: 'SubCategory' },
//     { id: 6, name: 'Coupon' },
// ];

const AdminNav = () => {
    //   const [indexSection, setIndexSection] = useState(0);
    //   const [page, setPage] = useState(1);

    //   <Tabs value={adminTabs[0].id}>
    //   <TabsHeader
    //       className="flex items-center space-x-2 bg-transparent rounded-none border-b border-light-outline-variant p-0"
    //       indicatorProps={{
    //           className: 'bg-transparent border-b-2 border-light-primary shadow-none rounded-none',
    //       }}
    //   >
    //       {adminTabs.map((tab) => (
    //           <Tab
    //               key={tab.id}
    //               value={tab.id}
    //               onClick={() => setPage(tab.id)}
    //               className={`transition-colors
    //                   ${page === tab.id ? 'text-light-secondary' : 'text-light-on-surface-variant/80'}
    //                   `}
    //           >
    //               <div className="flex items-center space-x-2">
    //                   {tab?.icon}
    //                   <p className="whitespace-nowrap">{tab.title}</p>
    //               </div>
    //           </Tab>
    //       ))}
    //   </TabsHeader>
    // </Tabs>

    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item w-fit">
                    <Link to="/admin/dashboard" className="nav-link hover:text-light-primary transition-colors">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item w-fit">
                    <Link to="/admin/product" className="nav-link hover:text-light-primary transition-colors">
                        Product
                    </Link>
                </li>

                <li className="nav-item w-fit">
                    <Link to="/admin/products" className="nav-link hover:text-light-primary transition-colors">
                        Products
                    </Link>
                </li>

                <li className="nav-item w-fit">
                    <Link to="/admin/category" className="nav-link hover:text-light-primary transition-colors">
                        Category
                    </Link>
                </li>

                <li className="nav-item w-fit">
                    <Link to="/admin/sub" className="nav-link hover:text-light-primary transition-colors">
                        Sub Category
                    </Link>
                </li>

                <li className="nav-item w-fit">
                    <Link to="/admin/coupon" className="nav-link hover:text-light-primary transition-colors">
                        Coupon
                    </Link>
                </li>

                {/* <li className="nav-item w-fit">
        <Link to="/user/password" className="nav-link hover:text-light-primary transition-colors">
          Password
        </Link>
      </li> */}
            </ul>
        </nav>
    );
};

export default AdminNav;
