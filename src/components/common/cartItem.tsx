import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import {
    counterMistakeMessage,
    LOCALSTORAGE_CART_NAME,
    removeFromCartConfirmMessage,
    removeFromCartMessage
} from "../../constats";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ICart, ICartItem, ICatalogItem } from "../../models";
import divideNumber from "../../utils/divideNumber";
import showUserMessage from "../../utils/showUserMessage";
import QuantityCounter from "./quantityCounter";
import WeightField from "./weightField";
import { getCart, getCartItem, loadCartList } from "../../store/cart";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface CartItemProps {
    product: ICatalogItem;
}

/** Компонент строки (номенклатуры) товара, отображаемого в корзине. */
const CartItem = ({ product }: CartItemProps): React.ReactElement => {
    const { windowWidth } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const currentCart = useAppSelector(getCart());
    const cartItem = useAppSelector(getCartItem(product.barcode));
    const [currentQuantity, setCurrentQuantity] = useState<number>(
        cartItem ? cartItem.quantity : 0
    );

    /** Функция проверяет, был ли сделан клик по кнопке уменьшения либо увеличения счётчика количества товаров, и соответствующим образом меняет счётчик, а также вызывает обновление корзины. */
    function updateCurrentQuantity(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof HTMLElement) {
            if (e.target.closest(".quantity__button_plus")) {
                setCurrentQuantity((prevState) => ++prevState);
                updateCart(currentQuantity + 1);
                return;
            }
            if (e.target.closest(".quantity__button_minus")) {
                if (currentQuantity > 1) {
                    setCurrentQuantity((prevState) => --prevState);
                    updateCart(currentQuantity - 1);
                } else {
                    showUserMessage("error", counterMistakeMessage);
                }
            }
        }
    }

    /** Функция обновляет корзину в LocalStorage и в Redux. */
    function updateCart(currentQuantity: number): void {
        if (cartItem) {
            const updatedCartItem: ICartItem = {
                barcode: cartItem.barcode,
                price: cartItem.price,
                quantity: currentQuantity
            };

            const updatedCart =
                (JSON.parse(JSON.stringify(currentCart)) as ICart) || {};
            updatedCart[cartItem.barcode] = updatedCartItem;

            localStorage.setItem(
                LOCALSTORAGE_CART_NAME,
                JSON.stringify(updatedCart)
            );
            dispatch(loadCartList());
        }
    }

    /** Функция удаляет товар из корзины. */
    function deleteItemFromCart(): void {
        if (cartItem) {
            const confirmation = confirm(removeFromCartConfirmMessage);
            if (confirmation) {
                const updatedCart =
                    (JSON.parse(JSON.stringify(currentCart)) as ICart) || {};
                delete updatedCart[cartItem.barcode];

                showUserMessage("success", removeFromCartMessage);

                if (Object.keys(updatedCart).length > 0) {
                    localStorage.setItem(
                        LOCALSTORAGE_CART_NAME,
                        JSON.stringify(updatedCart)
                    );
                } else {
                    localStorage.removeItem(LOCALSTORAGE_CART_NAME);
                }
                dispatch(loadCartList());
            }
        }
    }

    return (
        <article className="cartItem">
            <div className="cartItem__img">
                <img src={product.imgSmall} alt={product.name} />
            </div>
            <div className="cartItem__infos">
                <WeightField
                    dimensionType={product.dimensionType}
                    dimension={product.dimension}
                    classEl="cartItem__weight"
                />
                <div className="cartItem__name">{product.name}</div>
                <div className="cartItem__description">
                    {product.description}
                </div>
            </div>
            <QuantityCounter
                currentQuantity={currentQuantity}
                handleClick={updateCurrentQuantity}
            />
            {windowWidth > 479.98 && (
                <div className="cartItem__price">
                    {divideNumber(product.price)} ₽
                </div>
            )}
            <div className="cartItem__price">
                {divideNumber(product.price * currentQuantity)} ₽
            </div>
            <div
                className="cartItem__removeButton button"
                onClick={deleteItemFromCart}
            >
                <BsFillTrashFill />
            </div>
        </article>
    );
};

export default CartItem;
