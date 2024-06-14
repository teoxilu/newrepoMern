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
            <MenuList>
                <MenuItem className="flex items-center gap-2">
                    <DashboardIcon />
                    {user && user.role === 'customer' && (
                        <Link to={config.routes.history}>
                            <Typography variant="small" className="font-medium">
                                Dashboard
                            </Typography>
                        </Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link to={config.routes.adminDashboard}>
                            <Typography variant="small" className="font-medium">
                                Dashboard
                            </Typography>
                        </Link>
                    )}
                </MenuItem>

                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2" onClick={signOutClick}>
                    <LogoutIcon />
                    <Typography variant="small" className="font-medium">
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
