import React, { useRef } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useScroll } from 'framer-motion';

// import JumboTron from "../components/cards/JumboTron";
import CategoriesSection from '../components/home/CategoriesSection';
import YouMayLikeSection from '../components/home/YouMayLikeSection';
import images from '~/images';
import config from '~/config';
import videos from '~/assets/videos';
import AnimateSection from '~/components/AnimateSection';
import PartnersSection from '~/components/home/PartnersSection';
import transition from '~/utils/transition';

// const product = {
//     ratings: [{ star: 2 }, { star: 2 }, { star: 2 }, { star: 2 }],
// };
const Home = () => {
    const screenHeight = window.innerHeight;
    const bestSellerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: bestSellerRef,
        offset: ['0 1', '1 0.9'],
    });

    return (
        <div className="pt-24 overflow-x-hidden">
            <section className="relative flex">
                <img
                    src={images.heroImage}
                    alt="Shoe"
                    className={`w-full h-[${screenHeight}px] md:h-auto -mt-64 object-cover animate-imageIn`}
                />
                <div
                    className={`w-[552px] h-[440px] flex absolute self-center bottom-20 right-20 -translate-y-1/2 rounded-xl bg-light-surface-container-low px-14 py-8 flex-col justify-between animate-appear`}
                >
                    <div className="flex-col space-y-2 animate-textClip">
                        <Typography className="text-2xl text-light-on-surface">New Arrival</Typography>
                        <Typography className="text-[57px] font-bold text-light-on-surface leading-[64px]">
                            Discover Our New Collection
                        </Typography>
                        <Typography className="text-base text-light-on-surface-variant">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                            ullamcorper mattis.
                        </Typography>
                    </div>
                    <Link to={config.routes.shop}>
                        <Button
                            ripple
                            className="lg:inline-block rounded-full bg-light-primary opacity-0 animate-bounceInRight"
                        >
                            <Typography className="text-light-on-primary hover:bg-light-on-primary/8 text-sm font-medium">
                                Purchase Now!
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </section>

            {/* <motion.section
                className="mt-24"
                ref={bestSellerRef}
                style={{ scale: scrollYProgress, opacity: scrollYProgress }}
            > */}
            <AnimateSection>
                <CategoriesSection />
            </AnimateSection>
            {/* </motion.section> */}

            <AnimateSection className="bg-light-surface-container-medium shadow-inner">
                <video className="h-full w-full rounded-lg px-40 py-4" controls autoPlay muted>
                    <source src={videos.advertisementVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </AnimateSection>

            <AnimateSection className="mt-32">
                <YouMayLikeSection />
            </AnimateSection>

            <section className="px-40 mt-32">
                <Typography className="font-normal text-2xl h-fit text-light-on-surface-variant transition-opacity uppercase text-center">
                    Trusted Partners
                </Typography>
                <PartnersSection />
            </section>

        </div>
    );
};

export default transition(Home);
