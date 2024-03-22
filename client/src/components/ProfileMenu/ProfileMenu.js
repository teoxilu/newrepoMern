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
                    alt="tania andrew"
                    className="cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
