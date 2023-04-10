import React, { useState } from "react";
import {
    BsCaretDownFill,
    BsCaretUpFill,
    BsCart2,
    BsDownload,
    BsFillShareFill
} from "react-icons/bs";
import { Link, Redirect } from "react-router-dom";
import {
    counterMistakeMessage,
    formDisabledMessage,
    priceListDisabledMessage,
    HOMEPAGE
} from "../../constats";
import { useAppSelector } from "../../hooks/reduxHook";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ICatalogItem } from "../../models";
import { getCartItem } from "../../store/cart";
// import { getProduct } from "../../store/catalog";
import "../../styles/product.scss";
import divideNumber from "../../utils/divideNumber";
import showUserMessage from "../../utils/showUserMessage";
import AddToCartButton from "../common/addToCartButton";
import LinkButton from "../common/linkButton";
import QuantityCounter from "../common/quantityCounter";
import WeightField from "../common/weightField";

interface ProductPageProps {
    barcode: string;
    product: ICatalogItem | null;
}

/** Компонент страницы продукта. */
const ProductPage = ({
    barcode,
    product
}: ProductPageProps): React.ReactElement => {
    const { windowWidth } = useWindowDimensions();
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);
    const [descriptionSwitcher, setDescriptionSwitcher] =
        useState<boolean>(false);
    const isInCart = useAppSelector(getCartItem(barcode));

    /** Функция проверяет, был ли сделан клик по кнопке уменьшения либо увеличения счётчика количества товаров, и соответствующим образом меняет счётчик. */
    function updateCurrentQuantity(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof HTMLElement) {
            if (e.target.closest(".quantity__button_plus")) {
                setCurrentQuantity((prevState) => ++prevState);
                return;
            }
            if (e.target.closest(".quantity__button_minus")) {
                if (currentQuantity > 1) {
                    setCurrentQuantity((prevState) => --prevState);
                } else {
                    showUserMessage("error", counterMistakeMessage);
                }
            }
        }
    }

    if (!product) {
        return <Redirect to={HOMEPAGE + "404/"} />;
    } else {
        return (
            <section className="product" data-testid="hello">
                <div className="container">
                    <div className="product__body">
                        <div className="product__img">
                            {windowWidth > 991.98 && (
                                <img src={product.imgBig} alt={product.name} />
                            )}
                            {windowWidth <= 991.98 && (
                                <img
                                    src={product.imgSmall}
                                    alt={product.name}
                                />
                            )}
                        </div>
                        <div className="product__content">
                            <div className="product__inStore">В наличии</div>
                            <div className="product__name">{product.name}</div>
                            {windowWidth > 767.98 && (
                                <WeightField
                                    dimensionType={product.dimensionType}
                                    dimension={product.dimension}
                                    classEl="product__weight"
                                />
                            )}
                            {windowWidth > 767.98 && (
                                <>
                                    <div className="product__row">
                                        <div className="product__price">
                                            {divideNumber(product.price)} ₽
                                        </div>
                                        <QuantityCounter
                                            currentQuantity={currentQuantity}
                                            handleClick={updateCurrentQuantity}
                                        />
                                        {isInCart ? (
                                            <LinkButton
                                                link={HOMEPAGE + "cart/"}
                                                classEl="productCard__button button_green"
                                                text="Уже в корзине"
                                                icon={<BsCart2 />}
                                            />
                                        ) : (
                                            <AddToCartButton
                                                classEl="productCard__button"
                                                barcode={product.barcode}
                                                price={product.price}
                                                quantity={currentQuantity}
                                            />
                                        )}
                                    </div>
                                    <div className="product__links">
                                        <Link
                                            to={"#"}
                                            title={formDisabledMessage}
                                            className="product__shareLink"
                                            onClick={() =>
                                                showUserMessage(
                                                    "error",
                                                    formDisabledMessage
                                                )
                                            }
                                        >
                                            <BsFillShareFill />
                                        </Link>
                                        <div className="product__linkText">
                                            При покупке от <b>5 000 ₽</b>{" "}
                                            бесплатная доставка по Кокчетаву и
                                            области
                                        </div>
                                        <LinkButton
                                            link={"#"}
                                            classEl="product__priceLink"
                                            text="Прайс-лист"
                                            icon={<BsDownload />}
                                            title={priceListDisabledMessage}
                                            handleClick={() =>
                                                showUserMessage(
                                                    "error",
                                                    priceListDisabledMessage
                                                )
                                            }
                                        />
                                    </div>
                                </>
                            )}
                            {windowWidth <= 767.98 && (
                                <>
                                    <div className="product__row">
                                        <div className="product__price">
                                            {divideNumber(product.price)} ₽
                                        </div>
                                        <QuantityCounter
                                            currentQuantity={currentQuantity}
                                            handleClick={updateCurrentQuantity}
                                        />
                                    </div>
                                    <div className="product__row">
                                        {isInCart ? (
                                            <LinkButton
                                                link={HOMEPAGE + "cart/"}
                                                classEl="productCard__button button_green"
                                                text="Уже в корзине"
                                                icon={<BsCart2 />}
                                            />
                                        ) : (
                                            <AddToCartButton
                                                classEl="productCard__button"
                                                barcode={product.barcode}
                                                price={product.price}
                                                quantity={currentQuantity}
                                            />
                                        )}
                                        <Link
                                            to={"#"}
                                            title={formDisabledMessage}
                                            className="product__shareLink"
                                            onClick={() =>
                                                showUserMessage(
                                                    "error",
                                                    formDisabledMessage
                                                )
                                            }
                                        >
                                            <BsFillShareFill />
                                        </Link>
                                    </div>
                                    <div className="product__linkText">
                                        При покупке от <b>5 000 ₽</b> бесплатная
                                        доставка по Кокчетаву и области
                                    </div>
                                    <LinkButton
                                        link={"#"}
                                        classEl="product__priceLink"
                                        text="Прайс-лист"
                                        icon={<BsDownload />}
                                        title={priceListDisabledMessage}
                                        handleClick={() =>
                                            showUserMessage(
                                                "error",
                                                priceListDisabledMessage
                                            )
                                        }
                                    />
                                </>
                            )}
                            <div className="product__infos">
                                <div className="product__info">
                                    <span>Производитель: </span>
                                    <span>{product.manufacturer}</span>
                                </div>
                                <div className="product__info">
                                    <span>Бренд: </span>
                                    <span>{product.brand}</span>
                                </div>
                                <div className="product__info">
                                    <span>Штрихкод: </span>
                                    <span>{product.barcode}</span>
                                </div>
                            </div>
                            <div
                                className="product__descriptionHeader"
                                onClick={() =>
                                    setDescriptionSwitcher(
                                        (prevState) => !prevState
                                    )
                                }
                            >
                                <span>Описание</span>
                                <span>
                                    {descriptionSwitcher ? (
                                        <BsCaretUpFill />
                                    ) : (
                                        <BsCaretDownFill />
                                    )}
                                </span>
                            </div>
                            {descriptionSwitcher && (
                                <div className="product__descriptionBody">
                                    {product.description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default ProductPage;
