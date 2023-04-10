import React from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constats";
import { useAppSelector } from "../../hooks/reduxHook";
import { ICatalogItem } from "../../models";
import { getCartItem } from "../../store/cart";
import divideNumber from "../../utils/divideNumber";
import AddToCartButton from "./addToCartButton";
import LinkButton from "./linkButton";
import WeightField from "./weightField";

/** Компонент карточки товара, отображаемой в каталоге. */
const ProductCard = ({
    product
}: {
    product: ICatalogItem;
}): React.ReactElement => {
    const isInCart = useAppSelector(getCartItem(product.barcode));

    return (
        <article className="productCard">
            <div className="productCard__img">
                <Link to={HOMEPAGE + "catalog/" + product.barcode + "/"}>
                    <img src={product.imgSmall} alt="Фото товара" />
                </Link>
            </div>
            <WeightField
                dimensionType={product.dimensionType}
                dimension={product.dimension}
                classEl="productCard__weight"
            />
            <div className="productCard__name">
                <Link to={HOMEPAGE + "catalog/" + product.barcode + "/"}>
                    <span>{product.name}</span>
                </Link>
            </div>
            <div className="productCard__infoItems">
                <div className="productCard__infoItem">
                    <span>Штрихкод:</span>
                    <span>{product.barcode}</span>
                </div>
                <div className="productCard__infoItem">
                    <span>Производитель:</span>
                    <span>{product.manufacturer}</span>
                </div>
                <div className="productCard__infoItem">
                    <span>Бренд:</span>
                    <span>{product.brand}</span>
                </div>
            </div>
            <div className="productCard__footer">
                <div className="productCard__price">
                    {divideNumber(product.price)} ₽
                </div>
                {isInCart ? (
                    <LinkButton
                        link={HOMEPAGE + "cart/"}
                        classEl="productCard__button button_small button_green"
                        text="Уже в корзине"
                        icon={<BsCart2 />}
                    />
                ) : (
                    <AddToCartButton
                        classEl="productCard__button button_small"
                        barcode={product.barcode}
                        price={product.price}
                    />
                )}
            </div>
        </article>
    );
};

export default ProductCard;
