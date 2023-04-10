import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICatalogItem } from "../models";
import { AppDispatch, RootState } from "./createStore";
import catchError from "../utils/catchError";
import getProductsFromFirebase from "../services/getProductsFromFirebase";

interface ICatalogState {
    entities: ICatalogItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ICatalogState = {
    entities: [],
    isLoading: true,
    error: null
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        catalogRequested: (state: ICatalogState): void => {
            state.isLoading = true;
        },
        catalogReceived: (
            state: ICatalogState,
            action: PayloadAction<ICatalogItem[]>
        ): void => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        catalogRequestFailed: (
            state: ICatalogState,
            action: PayloadAction<string>
        ): void => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: catalogReducer, actions } = catalogSlice;
const { catalogRequested, catalogReceived, catalogRequestFailed } = actions;

/** Функция выполняет загрузку базы данных товаров из Firebasе и сохраняет полученный результат в Redux, либо отображает ошибку. */
export const loadCatalogList =
    () =>
        async (dispatch: AppDispatch): Promise<void> => {
            dispatch(catalogRequested());
            try {
                const products = await getProductsFromFirebase();
                if (products) {
                    dispatch(catalogReceived(Object.values(products)));
                } else {
                    dispatch(catalogReceived([]));
                }
            } catch (e: unknown) {
                const error = e as AxiosError;
                dispatch(catalogRequestFailed(error.message));
                catchError(error);
            }
        };

/** Функция запрашивает и возвращает заранее загруженную базу данных товаров, сохраненную в Redux. */
export const getCatalog =
    () =>
        (state: RootState): ICatalogItem[] =>
            state.catalog.entities;

/** Функция возвращает конкретный товар по запрошенному штрихкоду. */
export const getProduct =
    (barcode: string) =>
        (state: RootState): ICatalogItem | null =>
            state.catalog.entities.find((product) => product.barcode === barcode) ||
            null;

/** Функция возвращает массив товаров по массиву запрошенных штрихкодов. */
export const getProducts =
    (barcodes: string[]) =>
        (state: RootState): ICatalogItem[] | null =>
            state.catalog.entities.filter((product) =>
                barcodes.includes(product.barcode)
            ) || null;

/** Функция запрашивает и возвращает статус загрузки данных из Firebasе в Redux. */
export const getLoadingStatus =
    () =>
        (state: RootState): boolean =>
            state.catalog.isLoading;

export default catalogReducer;
