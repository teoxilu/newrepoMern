import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-tailwind/react';
import transition from '~/utils/transition';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const screenWidth = window.innerWidth;

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('A password reset link has been sent to your email!');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log('ERROR MSG IN FORGOT PASSWORD', error);
            });
    };

    return (
        <div>
            <div className="container px-40 py-5">
                <div className={`flex-col max-w-[${screenWidth / 2}px] m-auto space-y-5`}>
                    {loading ? (
                        <Typography className="text-base font-normal text-light-primary">Loading</Typography>
                    ) : (
                        <Typography className="text-base font-normal">Forgot Password</Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="w-full focus:border-light-primary focus:shadow focus:shadow-light-primary outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Registered Email"
                            autoFocus
                        />
                        <br />
                        <Button onClick={handleSubmit} className="rounded-full bg-light-primary mt-3" disabled={!email}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>

        // <div className="container col-md-6 offset-md-3 p-5">
        //   {loading ? (
        //     <h4 className="text-danger">Loading</h4>
        //   ) : (
        //     <h4>Forgot Password</h4>
        //   )}

        //   <form onSubmit={handleSubmit}>
        //     <input
        //       type="email"
        //       className="form-control"
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //       placeholder="Your Registered Email"
        //       autoFocus
        //     />
        //     <br />
        //     <button className="btn btn-raised" disabled={!email}>
        //       Submit
        //     </button>
        //   </form>
        // </div>
    );
};

export default transition(ForgotPassword);
