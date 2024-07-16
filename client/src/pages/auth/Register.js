import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-tailwind/react';
import transition from '~/utils/transition';
import { useHistory } from 'react-router-dom';
import StickyHeader from '~/components/StickyHeader';

const Register = () => {
    const [email, setEmail] = useState('');
    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const screenWidth = window.innerWidth;
    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const signInMethods = await auth.fetchSignInMethodsForEmail(email);
            // console.log('Sign-in methods:', signInMethods);
            if (signInMethods.length > 0) {
                toast.error('This email is already registered. Please try logging in.');
                return;
            }

            const config = {
                url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true,
            };

            await auth.sendSignInLinkToEmail(email, config);
            toast.success(`An email was sent to ${email}, please click the link in it to confirm your registration.`);

            // Save user's email in local storage
            window.localStorage.setItem('emailForRegistration', email);

            // Clear state
            setEmail('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const registerForm = () => (
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

            <br />
            <Button type="submit" className="rounded-full bg-light-primary text-light-on-primary mt-3" disabled={!email}>
                Register
            </Button>
        </form>
    );
    return (
        <>
            <StickyHeader />
            <div>
                <div className="container px-40 pb-5 pt-28">
                    <div className={`flex-col max-w-[${screenWidth / 2}px] m-auto space-y-5`}>
                        <Typography className="text-base font-normal text-light-on-surface">Register</Typography>
                        {registerForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default transition(Register);
