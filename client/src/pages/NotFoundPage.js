import { Button, Typography } from '@material-tailwind/react';
import { useHistory } from 'react-router-dom';
import transition from '~/utils/transition';

function NotFoundPage() {
    const history = useHistory();
    return (
        <div className="relative h-screen">
            <div className="absolute container left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
                <Typography className="text-light-primary text-8xl font-bold">404</Typography>
                <Typography className="uppercase text-light-on-surface text-xl font-normal">
                    Oops! Page not found
                </Typography>
                <Button
                    onClick={() => history.replace('/')}
                    size="lg"
                    variant="text"
                    className="text-light-primary hover:bg-light-primary/8 rounded-full"
                >
                    Back to Home Page
                </Button>
            </div>
        </div>
    );
}

export default transition(NotFoundPage);
