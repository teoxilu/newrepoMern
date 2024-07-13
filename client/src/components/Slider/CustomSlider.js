import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AnimatePresence, motion } from 'framer-motion';
function CustomSlider({ children, customSettings }) {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: true,
        focusOnSelect: true,
        className: 'center',
        centerMode: true,
        centerPadding: '0px',
        arrows: false,
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                layout
                className="slider-container transition-opacity"
            >
                <Slider className="flex h-auto" {...(customSettings ? { ...customSettings } : { ...settings })}>
                    {children}
                </Slider>
            </motion.div>
        </AnimatePresence>
    );
}

export default CustomSlider;
