import React from "react";
import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constats";
import { BsCart2 } from "react-icons/bs";
import { useAppSelector } from "../../hooks/reduxHook";
import { getTotalPriceAndQuantity } from "../../store/cart";
import divideNumber from "../../utils/divideNumber";

interface CartHeaderProps {
    windowWidth: number;
}

/** Компонент корзины, отображаемой в шапке. */
const CartHeader = ({
    windowWidth
}: CartHeaderProps): React.ReactElement => {
    const { totalPrice, totalQuantity } = useAppSelector(
        getTotalPriceAndQuantity()
    );

    return (
        <Link
            to={HOMEPAGE + "cart/"}
            className={
                windowWidth > 767.98
                    ? "bottomHeader__item bottomHeader__cart"
                    : "topHeader__cart"
            }
        >
            <div className="bottomHeader__cartImg">
                <BsCart2 />
                {totalQuantity > 0 && (
                    <span data-testid="cartHeaderTotalQuantity">
                        {totalQuantity}
                    </span>
                )}
            </div>
            {windowWidth > 767.98 && (
                <div className="bottomHeader__cartInfo">
                    <p>Корзина</p>
                    <p data-testid="cartHeaderTotalPrice">
                        {divideNumber(totalPrice)} ₽
                    </p>
                </div>
            )}
        </Link>
    );
};

export default CartHeader;
