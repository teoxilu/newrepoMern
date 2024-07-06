import axios from 'axios';

// export const sendConfirmationEmail = async(email, orderInfo, authtoken)

export const sendConfirmationEmail = async (email, orderInfo, authtoken) => {
 await axios.post(
            `${process.env.REACT_APP_API}/send-confirmation-email`,
            { email, orderInfo },
            {
                headers: {
                    Authorization: `Bearer ${authtoken}`, 
                },
            }
        );
};
