import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { LogoutIcon, DashboardIcon } from '~/components/Icons';
import config from '~/config';
export default function ProfileMenu({ onClick: signOutClick, loginStatus: user }) {
    return (
        <Menu>
            <MenuHandler>
                <Avatar
                    variant="circular"
                    alt={user.name}
                    className="cursor-pointer object-cover"
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </MenuHandler>
            <MenuList className="bg-light-surface-container-lowest text-light-on-surface">
                <MenuItem className="flex items-center gap-2 transition-colors hover:text-light-on-secondary-container hover:bg-light-secondary-container/8">
                    <DashboardIcon />
                    {user && user.role === 'customer' && (
                        <Link to={config.routes.history} className='hover:text-light-on-secondary-container'>
                            <p>Dashboard</p>
                        </Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link to={config.routes.adminDashboard} className='hover:text-light-on-secondary-container'>
                            <p>Dashboard</p>
                        </Link>
                    )}
                </MenuItem>

                <hr style={{ borderColor: '#e6bdb7' }} className="my-2" />
                <MenuItem className="flex items-center gap-2 transition-colors hover:text-light-on-secondary-container hover:bg-light-secondary-container/8" onClick={signOutClick}>
                    <LogoutIcon />
                    <p>Sign Out</p>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
