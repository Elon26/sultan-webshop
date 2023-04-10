import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../pages/productPage";
import CatalogPage from "../pages/catalogPage";
import { useAppSelector } from "../../hooks/reduxHook";
import { getProduct } from "../../store/catalog";
import { ICatalogItem } from "../../models";

/** Компонент роутера, перенаправляющего либо на страницу каталога либо на страницу товара, в зависимости от значения в адресной строке. */
const CatalogRouter = (): React.ReactElement => {
    const { barcode } = useParams<{ barcode: string }>();
    const product = useAppSelector<ICatalogItem | null>(getProduct(barcode));

    return (
        <>
            {barcode ? (
                <ProductPage barcode={barcode} product={product} />
            ) : (
                <CatalogPage />
            )}
        </>
    );
};

export default CatalogRouter;
