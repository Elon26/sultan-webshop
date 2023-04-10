import React, { useEffect } from "react";
import Loader from "../components/ui/loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { wrapAsyncFunction } from "../utils/wrapAsyncFunction";
import { loadCartList } from "./cart";
import { getLoadingStatus, loadCatalogList } from "./catalog";
import { AxiosError } from "axios";
import catchError from "../utils/catchError";

/** Higher-Order Component, предназначенный для единоразовой загрузки базы данных и сохраннённой корзины, с целью её последующего использования в разных частях приложения, без необходимости повторной загрузки. */
const AppLoader = ({
    children
}: {
    children: React.ReactElement;
}): React.ReactElement => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getLoadingStatus());

    /** Функция вызывает загрузку товаров из Firebase и корзины из LocalStorage. */
    const fetchData = async () => {
        try {
            dispatch(loadCartList());
            await dispatch(loadCatalogList());
        } catch (e) {
            const error = e as AxiosError;
            catchError(error);
        }
    };

    useEffect(wrapAsyncFunction(fetchData), []);

    if (isLoading) return <Loader />;

    return <>{children}</>;
};

export default AppLoader;
