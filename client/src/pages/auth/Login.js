import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import config from '~/config';
import images from '~/images';
import { createOrUpdateUser } from '~/functions/auth';
import transition from '~/utils/transition';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const screenWidth = window.innerWidth;

    const history = useHistory();

    useEffect(() => {
        let intended = history?.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push('/');
        }
    }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended page
        let intended = history?.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === 'admin') {
                history.push('/admin/dashboard');
            } else {
                // history.push('/user/history');
                history.push('/');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

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
                    roleBasedRedirect(res);
                })
                .catch((err) => console.log(err));

            history.push('/');
        } catch (error) {
            console.error(error);
            // toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
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
                                avatarImage: user.multiFactor.user.photoUrl,
                                expirationTime: idTokenResult.expirationTime,
                            },
                        });
                        roleBasedRedirect(res);
                    })
                    .catch((err) => console.log(err));
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.message);
            });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit} className="flex-col space-y-3">
            <input
                type="email"
                className="w-full focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
                required
            />

            <input
                type="password"
                className="w-full focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />
            <Button
                onClick={handleSubmit}
                variant="filled"
                size="lg"
                className="inline-flex justify-center w-full items-center gap-3 rounded-full  disabled:bg-[#908d8c] bg-light-primary transition-colors"
                disabled={!email || password.length < 6}
            >
                <Typography className="text-light-on-primary text-sm font-bold">Log in</Typography>
            </Button>
        </form>
    );
    return (
        <div className="container px-40 pb-5 pt-28">
            <div
                className={`flex-col max-w-[${screenWidth / 2}px] m-auto space-y-10 divide-y divide-light-outline-variant`}
            >
                <div className="flex-col space-y-5">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <Typography className="text-base font-normal text-light-on-surface">Log in</Typography>
                    )}
                    {loginForm()}
                </div>

                <div className="flex-col space-y-5 pt-10">
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        size="lg"
                        className="inline-flex w-full justify-center items-center gap-3 rounded-full border-light-outline hover:bg-light-primary/8 transition-colors"
                    >
                        <img src={images.emailIcon} alt="metamask" className="h-6 w-6" />
                        <Typography className="text-light-primary text-sm font-bold">
                            Login with Email & Password
                        </Typography>
                    </Button>

                    <Button
                        onClick={googleLogin}
                        // type="danger"
                        variant="outlined"
                        className="inline-flex w-full justify-center items-center gap-3 rounded-full border-light-outline hover:bg-light-primary/8 transition-colors"
                        size="lg"
                    >
                        <img
                            src="https://docs.material-tailwind.com/icons/google.svg"
                            alt="metamask"
                            className="h-6 w-6"
                        />
                        <Typography className="text-light-primary text-sm font-bold">Login with Google</Typography>
                    </Button>

                    <Link to={config.routes.forgotPassword} className="float-right">
                        <Typography
                            variant="small"
                            className="text-light-on-background opacity-80 hover:opacity-100 transition-opacity font-normal
                        "
                        >
                            Forgot Password?
                        </Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default transition(Login);
