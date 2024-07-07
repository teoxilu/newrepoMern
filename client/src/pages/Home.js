import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';

// const product = {
//     ratings: [{ star: 2 }, { star: 2 }, { star: 2 }, { star: 2 }],
// };
const Home = () => {
    const [bannerContent, setBannerContent] = useState(null);
    const screenHeight = window.innerHeight;

    useEffect(() => {
        const fetchBannerContent = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API}/banner`).then((res) => setBannerContent(res.data));
            } catch (error) {
                console.error('Error fetching: ', error);
            }
        };
        fetchBannerContent();
    }, []);
    return (
        <div className="pt-24 overflow-x-hidden">
            <section className="relative flex">
                <img
                    src={images[`${bannerContent?.image}`]}
                    alt={bannerContent?.image}
                    className={`w-full h-[${screenHeight}px] md:h-auto -mt-64 object-cover animate-imageIn`}
                />
                <div
                    className={`w-[552px] min-h-96 flex absolute self-center rounded-xl bg-light-surface-container-low px-14 py-8 flex-col justify-between animate-appear bottom- ${bannerContent?.class}`}
                >
                    <div className="flex flex-col space-y-4 animate-textClip">
                        <div className="flex flex-col space-y-2">
                            <Typography className="text-2xl text-light-on-surface">
                                {bannerContent?.subTitle}
                            </Typography>
                            <Typography
                                className="text-5xl font-bold text-light-on-surface text-pretty
                            "
                            >
                                {bannerContent?.title}
                            </Typography>
                        </div>
                        <Typography className="text-base font-normal text-light-on-surface-variant">
                            {bannerContent?.desc}
                        </Typography>
                    </div>
                    <Link to={config.routes.shop}>
                        <Button
                            ripple
                            className="lg:inline-block rounded-full bg-light-primary opacity-0 animate-bounceInRight"
                        >
                            <Typography className="text-light-on-primary hover:bg-light-on-primary/8 text-sm font-medium">
                                {bannerContent?.button}
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </section>

            <AnimateSection>
                <CategoriesSection />
            </AnimateSection>

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
