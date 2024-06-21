import React, { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    // let navigate = useHistory();
    let { slug } = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            this.props.history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` },
            });
        }
    };

    return (
        <>
            <Button variant='text' onClick={handleModal} className="text-light-primary rounded-lg hover:bg-light-primary/8">
                <StarOutlined className="text-light-primary" /> <br />
                {user ? 'Leave Rating' : 'Login to leave rating'}
            </Button>
            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success('Thanks for your review.');
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;
