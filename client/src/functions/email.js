import axios from 'axios';

// export const sendConfirmationEmail = async(email, orderInfo, authtoken)

export const sendConfirmationEmail = async (email, order, authtoken) => {
 await axios.post(
            `${process.env.REACT_APP_API}/send-confirmation-email`,
            { email, order },
            {
                headers: {
                    authtoken, 
                },
            }
        );
};
