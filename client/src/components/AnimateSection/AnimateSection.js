import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

function AnimateSection({children, className:customClassName, offSetEnd='1.2'}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', `1 ${offSetEnd}`],
    });
    return (
        <motion.section
            className={`mt-24 ${customClassName}`}
            ref={ref}
            style={{ scale: scrollYProgress, opacity: scrollYProgress }}
        >
            {children}
        </motion.section>
    );
}

export default AnimateSection;
