import React, { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [dialogVisible, setDialogVisible] = useState(false);
    let history = useHistory();

    const handleOpen = () => setDialogVisible(!dialogVisible);
    let { slug } = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setDialogVisible(true);
        } else {
            history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` },
            });
        }
    };

    return (
        <>
            <Button
                variant="text"
                onClick={handleModal}
                className="text-light-primary rounded-lg hover:bg-light-primary/8"
            >
                <StarOutlined className="text-light-primary" /> <br />
                {user ? 'Leave Rating' : 'Login to rating'}
            </Button>

            <Dialog open={dialogVisible} handler={handleOpen}>
                <DialogHeader>Leave your rating</DialogHeader>
                <DialogBody>{children}</DialogBody>
                <DialogFooter className="flex items-center space-x-2">
                    <Button
                        variant="text"
                        className="rounded-full text-light-primary hover:bg-light-primary/8 transition-colors"
                        onClick={handleOpen}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleOpen();
                            toast.success('Thanks for your review.');
                        }}
                        className="rounded-full bg-light-primary text-light-on-primary"
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setDialogVisible(false);
                    toast.success('Thanks for your review.');
                }}
                onCancel={() => setDialogVisible(false)}
            >
                {children}
            </Modal> */}
        </>
    );
};

export default RatingModal;
