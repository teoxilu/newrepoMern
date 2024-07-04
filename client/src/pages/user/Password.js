import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';

const Password = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password)

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword('');
                toast.success('Password Updated');
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
                <label>New Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base  bg-light-surface-container-lowest border rounded-lg !border-light-outline"
                    placeholder="Enter New Password"
                    disabled={loading}
                    value={password}
                />
                <br />
                <label>Retype Password</label>
                <input
                    type="password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base  bg-light-surface-container-lowest border rounded-lg !border-light-outline"
                    placeholder="Retype Password"
                    disabled={loading}
                    value={confirmPassword}
                />
                <br />
                <Button
                    className="bg-light-primary text-light-on-primary rounded-full"
                    disabled={!password || password.length < 6 || loading || password !== confirmPassword}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid pt-28 text-light-on-surface">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h1 className="text-danger">Loading...</h1>
                    ) : (
                        <h1 className="font-medium text-base">Password Update</h1>
                    )}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;
