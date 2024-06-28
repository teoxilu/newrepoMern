// import { Card, Skeleton } from "antd";
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import React from 'react';

const LoadingCard = () => {
    // const cards = () => {
    //   let totalCards = [];

    //   for (let i = 0; i < count; i++) {
    //     totalCards.push(
    //       <Card className="col-md-4" key={i}>
    //         <Skeleton active></Skeleton>
    //       </Card>
    //     );
    //   }

    //   return totalCards;
    // };

    // return <div className="flex items-center space-x-2 justify-evenly">{cards()}</div>;
    return (
        <Card className="w-72 h-[492px] animate-pulse">
            <CardHeader shadow={false} floated={false} className="h-52">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-full w-full text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
            </CardHeader>
            <CardBody>
                <div className="pb-2 flex items-center justify-between gap-x-2">
                    <Typography as="div" className="h-14 w-56 bg-gray-300 rounded-full">
                        &nbsp;
                    </Typography>
                    <Typography as="div" className="h-7 w-56 bg-gray-300 rounded-full">
                        &nbsp;
                    </Typography>
                </div>
                <div className='flex flex-col space-y-2'>
                  <Typography as="div" className="h-5 w-56 bg-gray-300 rounded-full">
                      &nbsp;
                  </Typography>
                  <Typography as="div" className="h-5 w-56 bg-gray-300 rounded-full">
                      &nbsp;
                  </Typography>
                </div>
            </CardBody>
            <CardFooter className="w-full flex items-center justify-between space-x-2">
                <Typography as="button" className="h-12 w-56 bg-gray-300 rounded-full">
                    &nbsp;
                </Typography>
                <Typography as="button" className="h-12 w-56 bg-gray-300 rounded-full">
                    &nbsp;
                </Typography>
            </CardFooter>
        </Card>
    );
};

export default LoadingCard;
