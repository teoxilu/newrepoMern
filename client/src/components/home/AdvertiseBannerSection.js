import { Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { initial } from 'lodash';
import { TrophyIcon, WarrantyIcon, SecureIcon, SupportIcon } from '~/components/Icons';

const BANNER_ITEM = [
    { id: 1, icon: <TrophyIcon />, title: 'High Quality', desc: 'Craft from top materials' },
    { id: 2, icon: <WarrantyIcon />, title: 'Warranty Protection', desc: 'Over 1 years' },
    { id: 3, icon: <SecureIcon />, title: 'Secure Payment', desc: 'Pay securely with Stripe' },
    { id: 4, icon: <SupportIcon />, title: '24/7 Support', desc: 'Dedicated support from our Chatbot AI' },
];

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 *index,
        },
    })
};

function AdvertiseBannerSection() {
    const screenHeight = window.innerHeight;

    return (
        <section>
            <ul className={`mt-[${screenHeight / 1.9}px] w-full px-40 py-8 bg-light-tertiary-container shadow-inner flex items-center justify-between`}>
                {BANNER_ITEM.map((item) => (
                    <motion.li
                        key={item.id}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        animate="animate"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={item.id}
                    >
                        <div className="flex items-center space-x-2">
                            {item.icon}
                            <div className="flex flex-col space-y-1">
                                <Typography className="font-normal text-2xl text-light-on-tertiary-container">
                                    {item.title}
                                </Typography>
                                <p className="text-light-on-tertiary-container/85">{item.desc}</p>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}

export default AdvertiseBannerSection;
