import React, { useState } from "react";
import { LOCALSTORAGE_CART_NAME } from "../../constats";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ICart, ICatalogItem } from "../../models";
import {
    getCart,
    getTotalPriceAndQuantity,
    loadCartList
} from "../../store/cart";
import { getProducts } from "../../store/catalog";
import "../../styles/cart.scss";
import divideNumber from "../../utils/divideNumber";
import CartItem from "../common/cartItem";
import ThanksForBuyPopup from "../ui/thanksForBuyPopup";

/** Компонент корзины. */
const CartPage = (): React.ReactElement => {
    const currentCart = useAppSelector(getCart()) as ICart;
    const barcodesInCart = currentCart ? Object.keys(currentCart) : [];
    const products = useAppSelector<ICatalogItem[] | null>(
        getProducts(barcodesInCart)
    );
    const { totalPrice } = useAppSelector(getTotalPriceAndQuantity());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dispatch = useAppDispatch();

    /** Функция открывает всплывающее окно о подтверждении заказа и очищает корзину. */
    function handleSendOrder() {
        setIsPopupOpen(true);
        localStorage.removeItem(LOCALSTORAGE_CART_NAME);
        dispatch(loadCartList());
        window.scrollTo(0, 0);
    }

    return (
        <section className="cart">
            <div className="container">
                {!currentCart && <h1 className="pageTitle">Корзина пуста</h1>}
                {currentCart && (
                    <>
                        <h1 className="cart__title pageTitle">Корзина</h1>
                        <div className="cart__items">
                            {products?.map((product) => (
                                <CartItem
                                    key={"CartItem" + product.barcode}
                                    product={product}
                                />
                            ))}
                        </div>
                        <div className="cart__footer">
                            <div
                                className="cart__button button"
                                onClick={handleSendOrder}
                            >
                                Оформить заказ
                            </div>
                            <div className="cart__price">
                                {divideNumber(totalPrice)} ₽
                            </div>
                        </div>
                    </>
                )}
                <ThanksForBuyPopup
                    isPopupOpen={isPopupOpen}
                    closePopup={() => setIsPopupOpen(false)}
                />
            </div>
        </section>
    );
};

export default CartPage;
