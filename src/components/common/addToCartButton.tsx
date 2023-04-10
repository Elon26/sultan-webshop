import React from "react";
import "../../styles/button.scss";
import { BsCart2 } from "react-icons/bs";
import { ICart, ICartItem } from "../../models";
import showUserMessage from "../../utils/showUserMessage";
import { addToCartMessage, LOCALSTORAGE_CART_NAME } from "../../constats";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getCart, loadCartList } from "../../store/cart";

interface AddToCartButtonProps {
    classEl: string;
    barcode: string;
    price: number;
    quantity?: number;
}

/** Компонент кнопки добавления в корзину. */
const AddToCartButton = ({
    classEl,
    barcode,
    price,
    quantity
}: AddToCartButtonProps): React.ReactElement => {
    const dispatch = useAppDispatch();
    const currentCart = useAppSelector(getCart());

    /** Функция обновляет корзину в LocalStorage и в Redux. */
    function handleClick(): void {
        const cartItem: ICartItem = {
            barcode,
            price,
            quantity: 1
        };
        if (quantity) cartItem.quantity = quantity;

        const updatedCart =
            (JSON.parse(JSON.stringify(currentCart)) as ICart) || {};
        updatedCart[cartItem.barcode] = cartItem;

        showUserMessage("success", addToCartMessage);
        localStorage.setItem(
            LOCALSTORAGE_CART_NAME,
            JSON.stringify(updatedCart)
        );
        dispatch(loadCartList());
    }

    return (
        <button className={classEl + " button"} onClick={handleClick}>
            <span>В корзину</span>
            <BsCart2 />
        </button>
    );
};

export default AddToCartButton;
