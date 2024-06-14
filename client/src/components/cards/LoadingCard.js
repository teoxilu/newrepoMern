import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="flex items-center space-x-2 justify-evenly">{cards()}</div>;
};

export default LoadingCard;
