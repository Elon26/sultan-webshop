import React, { useEffect } from "react";
import { BsCheck2All, BsX } from "react-icons/bs";
import "../../styles/thanksForBuyPopup.scss";

interface ThanksForBuyPopupProps {
    isPopupOpen: boolean;
    closePopup(): void;
}

/** Компонент окна, всплывающего после оформления покупки. */
const ThanksForBuyPopup = ({
    isPopupOpen,
    closePopup
}: ThanksForBuyPopupProps): React.ReactElement => {
    /** Функция обрабатывает клик и вывывает закрытие всплывающего окна при клике на соответсвующую иконку, а также на пустое пространство. */
    function handleCloseClick(e: React.MouseEvent<HTMLElement>) {
        if (e.target instanceof Element) {
            if (
                !e.target.closest(".thanksForBuyPopup__body") ||
                e.target.closest(".thanksForBuyPopup__icon_closeIcon")
            ) {
                closePopup();
            }
        }
    }

    /** Настройка включает/выключает блокировку прокрутки страницы на время открытия всплывающего окна */
    useEffect(() => {
        const body = document.body;
        if (isPopupOpen) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "visible";
        }
    }, [isPopupOpen]);

    return (
        <div
            className={"thanksForBuyPopup" + (isPopupOpen ? " visible" : "")}
            onClick={handleCloseClick}
        >
            <div className="thanksForBuyPopup__body">
                <div className="thanksForBuyPopup__icon thanksForBuyPopup__icon_closeIcon">
                    <BsX />
                </div>
                <div className="thanksForBuyPopup__icon">
                    <BsCheck2All />
                </div>
                <div className="thanksForBuyPopup__bigText">
                    Спасибо за заказ
                </div>
                <div className="thanksForBuyPopup__smallText">
                    Наш менеджер свяжется с вами в ближайшее время
                </div>
            </div>
        </div>
    );
};

export default ThanksForBuyPopup;
