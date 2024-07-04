import { Typography } from '@material-tailwind/react';
import AnimateSection from '~/components/AnimateSection';
import images from '~/images';

const PARTNERS = [
    {
        id: 1,
        img: images.adidasLogo,
        title: 'Adidas Logo',
    },
    {
        id: 2,
        img: images.asicsLogo,
        title: 'Asics Logo',
    },
    {
        id: 3,
        img: images.nikeLogo,
        title: 'Nike Logo',
    },
    {
        id: 4,
        img: images.salomonLogo,
        title: 'Salomon Logo',
    },
    {
        id: 5,
        img: images.yonexLogo,
        title: 'Yonex Logo',
    },
];
function PartnersSection() {
    return (
        <div className="flex flex-col">
            {PARTNERS.map((partner) => (
                <AnimateSection offSetEnd='0.9'>
                    <img
                        key={partner.id}
                        src={partner.img}
                        alt={partner.title}
                        className="w-[25%] m-auto h-auto object-cover rounded-lg bg-transparent"
                    />
                  </AnimateSection>
            ))}
        </div>
    );
}

export default PartnersSection;
