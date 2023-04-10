import React, { useState } from "react";
import { ICatalogItem } from "../../models";
import WeightField from "./weightField";
import divideNumber from "../../utils/divideNumber";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import ChangeOrCreateProductPopup from "../ui/changeOrCreateProductPopup";

interface AdminProductItemProps {
    product: ICatalogItem;
    deleteItemFromDB(barcode: string): void;
    setIsLoading(prevState: boolean): void;
}

/** Компонент данных о товаре, отображаемых на странице администратора. */
const AdminProductItem = ({
    product,
    deleteItemFromDB,
    setIsLoading
}: AdminProductItemProps): React.ReactElement => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    /** Функция вызывает открытие компонента всплывающего окна и блокировку прокрутки основного контента. */
    function openPopup() {
        setIsPopupOpen(true);
        document.body.style.overflow = "hidden";
    }

    /** Функция вызывает закрытие компонента всплывающего окна и разблокировку прокрутки основного контента. */
    function closePopup() {
        setIsPopupOpen(false);
        document.body.style.overflow = "visible";
    }

    return (
        <div className="adminProductCard">
            <div className="adminProductCard__img">
                <img src={product.imgSmall} alt={product.name} />
            </div>
            <div className="adminProductCard__infos">
                <WeightField
                    dimensionType={product.dimensionType}
                    dimension={product.dimension}
                    classEl="adminProductCard__weight"
                />
                <div className="adminProductCard__name">{product.name}</div>
                <div className="adminProductCard__infoItem">
                    <span>Штрихкод:</span>
                    <span>{product.barcode}</span>
                </div>
                <div className="adminProductCard__infoItem">
                    <span>Бренд:</span>
                    <span>{product.brand}</span>
                </div>
                <div className="adminProductCard__infoItem">
                    <span>Производитель:</span>
                    <span>{product.manufacturer}</span>
                </div>
                <div className="adminProductCard__infoItem">
                    <span>Назначение:</span>
                    <span>{product.purposes.join(", ")}</span>
                </div>
                <div className="adminProductCard__description">
                    {product.description}
                </div>
            </div>
            <div className="adminProductCard__price">
                {divideNumber(product.price)} ₽
            </div>
            <div
                className="adminProductCard__removeButton button"
                onClick={openPopup}
            >
                <BsPencil />
            </div>
            <div
                className="adminProductCard__removeButton button"
                onClick={() => deleteItemFromDB(product.barcode)}
            >
                <BsFillTrashFill />
            </div>
            {isPopupOpen && (
                <ChangeOrCreateProductPopup
                    closePopup={closePopup}
                    product={product}
                    setIsLoading={setIsLoading}
                />
            )}
        </div>
    );
};

export default AdminProductItem;
