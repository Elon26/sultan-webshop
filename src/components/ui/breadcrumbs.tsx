import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useHistory, useLocation } from "react-router-dom";
import { HOMEPAGE } from "../../constats";
import { useAppSelector } from "../../hooks/reduxHook";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ICatalogItem } from "../../models";
import { getProduct } from "../../store/catalog";
import "../../styles/breadcrumbs.scss";

/** Компонент навигационной цепочки. */
const Breadcrumbs = (): React.ReactElement => {
    /** Функционал импортирует переменную текущей ширины экрана, создаёт вспомогательную переменную для переадресации пользователя, а также получает значение адресной строки и преобразует его в массив звеньев навигационной цепочки. */
    const { windowWidth } = useWindowDimensions();
    const history = useHistory();
    const location = useLocation();
    const routes = location.pathname.split("/");

    /** Функционал очищает массив звеньев навигационной цепочки от лишних элементов. */
    const clearedRoutes = [];
    for (let i = 1; i < routes.length - 1; i++) {
        clearedRoutes.push(routes[i]);
    }

    /** Функционал преобразует массив звеньев навигационной цепочки в русский текст для последующего вывода пользователю. */
    let secondLinkName = "";
    switch (clearedRoutes[1]) {
        case "catalog":
            secondLinkName = "Каталог";
            break;

        case "cart":
            secondLinkName = "Корзина";
            break;

        case "admin":
            secondLinkName = "Страница администратора";
            break;

        case "404":
            secondLinkName = "Страница 404";
            break;

        default:
            break;
    }

    /** Функционал запрашивает и получает название продукта по штрихкоду, полученному из адресной строки. */
    const product = useAppSelector<ICatalogItem | null>(
        getProduct(clearedRoutes[2])
    );
    const thirdLinkName = product?.name;

    /** Функционал запрещает отображение хлебных крошек для главной страницы. */
    if (clearedRoutes.length <= 1) return <></>;

    return (
        <div className="container">
            {windowWidth > 767.98 && (
                <div className="breadcrumbs">
                    <Link className="breadcrumbs__link" to={HOMEPAGE}>
                        Главная
                    </Link>
                    <span className="breadcrumbs__separator"> | </span>
                    {clearedRoutes.length === 2 && (
                        <span className="breadcrumbs__end">
                            {secondLinkName}
                        </span>
                    )}
                    {clearedRoutes.length === 3 && (
                        <>
                            <Link
                                className="breadcrumbs__link"
                                to={HOMEPAGE + clearedRoutes[1] + "/"}
                            >
                                {secondLinkName}
                            </Link>
                            <span className="breadcrumbs__separator"> | </span>
                            <span className="breadcrumbs__end">
                                {thirdLinkName}
                            </span>
                        </>
                    )}
                </div>
            )}
            {windowWidth <= 767.98 && (
                <div
                    className="breadcrumbs__goBack"
                    onClick={() => history.go(-1)}
                >
                    <div className="breadcrumbs__goBackButton">
                        <BsChevronLeft />
                    </div>
                    <span className="breadcrumbs__goBackText">Назад</span>
                </div>
            )}
        </div>
    );
};

export default Breadcrumbs;
