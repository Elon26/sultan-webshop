import React from "react";
import StarRatings from "react-star-ratings";
import "../../styles/button.scss";

interface LinkButtonProps {
    name: string;
    date: string;
    rate: number;
    advantages: string;
    disadvantages: string;
    comment: string;
}

/** Компонент отзыва. */
const FeedbackItem = ({
    name,
    date,
    rate,
    advantages,
    disadvantages,
    comment
}: LinkButtonProps): React.ReactElement => {
    return (
        <div className="feedbackItem">
            <div className="feedbackItem__wrapper">
                <div className="feedbackItem__name">{name}</div>
                <div className="feedbackItem__date">{date}</div>
                <div className="feedbackItem__rate">
                    <StarRatings
                        rating={rate}
                        starDimension="26px"
                        starSpacing="2px"
                        starEmptyColor="#4D4D4D"
                        starRatedColor="#F9AD3D"
                        starHoverColor="#F9AD3D"
                        numberOfStars={5}
                        name="rating"
                    />
                </div>
                <div className="feedbackItem__textItem">
                    <b>Достоинства: </b>
                    <span>{advantages}</span>
                </div>
                <div className="feedbackItem__textItem">
                    <b>Недостатки: </b>
                    <span>{disadvantages}</span>
                </div>
                <div className="feedbackItem__textItem">
                    <b>Комментарий: </b>
                    <span>{comment}</span>
                </div>
            </div>
        </div>
    );
};

export default FeedbackItem;
