import React from "react";
import "../../styles/mainPage.scss";
import MainSlider from "../ui/mainSlider";
import feedback from "../../mockData/feedback.json";
import FeedbackItem from "../common/feedbackItem";

/** Компонент главной страницы. */
const MainPage = (): React.ReactElement => {
    return (
        <section className="mainPage" data-testid="mainPageOuter">
            <div className="container">
                <MainSlider />
                <div className="mainPage__feedback feedback">
                    <div className="feedback__body">
                        {feedback.map(item => (
                            <FeedbackItem
                                key={item.name + Date.now().toString()}
                                name={item.name}
                                date={item.date}
                                rate={item.rate}
                                advantages={item.advantages}
                                disadvantages={item.disadvantages}
                                comment={item.comment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPage;
