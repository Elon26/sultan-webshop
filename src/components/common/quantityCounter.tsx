import React from "react";
import "../../styles/quantityCounter.scss";

interface QuantityCounterProps {
    currentQuantity: number;
    handleClick(e: React.MouseEvent<HTMLElement>): void;
}

/** Компонент, отображающий счётчик увеличения/уменьшения товаров в корзине. */
const QuantityCounter = ({
    currentQuantity,
    handleClick
}: QuantityCounterProps): React.ReactElement => {
    return (
        <div className="quantity" onClick={handleClick}>
            <div
                className="quantity__button quantity__button_minus"
                data-testid="currentCounterDecrement"
            >
                -
            </div>
            <span data-testid="currentCounterValue">{currentQuantity}</span>
            <div
                className="quantity__button quantity__button_plus"
                data-testid="currentCounterIncrement"
            >
                +
            </div>
        </div>
    );
};

export default QuantityCounter;
