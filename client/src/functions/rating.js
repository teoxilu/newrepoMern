import { Typography } from "@material-tailwind/react";
import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);

    let highest = length * 5;
    console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <div className="inline-flex space-x-1 items-center text-center pt-2">
          <StarRating
            starRatedColor="orange"
            starDimension="24px"
            starSpacing="1px"
            rating={result}
            editing={false}
          />
          <Typography className="text-sm text-light-on-surface">({p.ratings.length})</Typography>
      </div>
    );
  }
};
