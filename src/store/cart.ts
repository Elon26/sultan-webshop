import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCALSTORAGE_CART_NAME } from "../constats";
import { ICart, ICartItem } from "../models";
import { AppDispatch, RootState } from "./createStore";

interface ICartState {
    entities: ICart | null;
}

const initialState: ICartState = {
    entities: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartUpdated: (
            state: ICartState,
            action: PayloadAction<ICart | null>
        ): void => {
            state.entities = action.payload;
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartUpdated } = actions;

/** Функция проверяет наличие сохранённого объекта корзины в localStorage и, при наличии, выполяет его сохранение в Redux. */
export const loadCartList =
    () =>
        (dispatch: AppDispatch): void => {
            const requestedData = localStorage.getItem(LOCALSTORAGE_CART_NAME);

            if (requestedData) {
                const savedData = JSON.parse(requestedData) as ICart;
                dispatch(cartUpdated(savedData));
            } else {
                dispatch(cartUpdated(null));
            }
        };

/** Функция запрашивает и возвращает заранее загруженный объект корзины, сохраненный в Redux. */
export const getCart =
    () =>
        (state: RootState): ICart | null =>
            state.cart.entities;

/** Функция проверяет объект корзины на наличие в нём товара по заданному штрихкоду и возвращает вложенный объект либо null. */
export const getCartItem =
    (barcode: string) =>
        (state: RootState): ICartItem | null =>
            state.cart.entities && state.cart.entities[barcode];

/** Функция вычисляет и возвращает текущие общие стоимость и сумму товаров в корзине. */
export const getTotalPriceAndQuantity =
    () =>
        (state: RootState): { [key: string]: number } => {
            const dataInCarts =
                state.cart.entities && Object.values(state.cart.entities);
            const totalPrice =
                dataInCarts &&
                dataInCarts.reduce(
                    (sum, item) => sum + item.quantity * item.price,
                    0
                );
            const totalQuantity =
                dataInCarts &&
                dataInCarts.reduce((sum, item) => sum + item.quantity, 0);
            return {
                totalPrice: totalPrice || 0,
                totalQuantity: totalQuantity || 0
            };
        };

export default cartReducer;
