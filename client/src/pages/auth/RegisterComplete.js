import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';
import transition from '~/utils/transition';
import StickyHeader from '~/components/StickyHeader';
import { Button, Typography } from '@material-tailwind/react';
import { useHistory } from 'react-router-dom';

const RegisterComplete = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log(window.location.href);
        console.log(window.localStorage.getItem('emailForRegistration'));
    }, [history]);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!email || !password) {
            toast.error('Email and password required');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            //   console.log("RESULT", result);
            if (result.user.emailVerified) {
                //remove user's email from localStorage
                window.localStorage.removeItem('emailForRegistration');
                //get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                //redux store
                // console.log('user', user, 'idTokenResult', idTokenResult);
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
                //redirect
                history.push('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 mt-2">
                <input
                    type="email"
                    className="form-control bg-light-surface-container-lowest cursor-not-allowed"
                    value={email}
                    disabled
                />

                <input
                    type="password"
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password"
                    autoFocus
                />
            </div>
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
                Use at least 6 characters.
            </Typography>
            <br />

            <Button
                type="submit"
                className="rounded-full bg-light-primary text-light-on-primary"
                disabled={!(password && password.length >= 6)}
            >
                Complete Registration
            </Button>
        </form>
    );
    return (
        <>
            <StickyHeader />
            <div>
                <div className="container px-40 pb-5 pt-28">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <Typography className="text-base font-normal text-light-on-surface">
                                Register Complete
                            </Typography>

                            {completeRegistrationForm()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default transition(RegisterComplete);
