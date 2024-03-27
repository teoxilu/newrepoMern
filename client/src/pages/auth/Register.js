import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import StickyHeader from '~/components/StickyHeader';
import { Typography } from '@material-tailwind/react';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const { user } = useSelector((state) => ({ ...state }));

    const screenWidth = window.innerWidth;
    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`An email was sent to ${email}, please click the link in it to confirm your registration. `);

        //save user's email in local storage
        window.localStorage.setItem('emailForRegistration', email);

        //clear state
        setEmail('');
    };

    const registerform = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="w-full focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
                required
            />
            <Typography variant="small" className="mt-2 flex items-center gap-1 font-normal text-light-on-background">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="light-on-surface"
                    className="-mt-px h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                </svg>
                Use at least 6 characters, one uppercase, one lowercase and one number.
            </Typography>

            <br />
            <button
                type="submit"
                className="rounded-full bg-light-primary px-4 py-6 h-12 flex items-center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 "
            >
                <span className="text-xs font-bold text-light-on-primary">Register</span>
            </button>
        </form>
    );
    return (
        <div>
            <StickyHeader />
            <div className="container px-40 py-5">
                <div className={`flex-col max-w-[${screenWidth / 2}px] m-auto space-y-5`}>
                    <Typography className="text-base font-normal">Register</Typography>
                    {registerform()}
                </div>
            </div>
        </div>
    );
};

export default Register;
