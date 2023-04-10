import React, { useState } from "react";
import useMockData from "../../hooks/useMockData";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import "../../styles/adminPage.scss";
import LinkButton from "../common/linkButton";
import { BsBoxArrowDown, BsBricks } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ICatalogItem } from "../../models";
import { getCatalog, loadCatalogList } from "../../store/catalog";
import AdminProductItem from "../common/adminProductItem";
import {
    restoreDBMessage,
    removeFromDBConfirmMessage,
    removeFromDBSuccessMessage,
    SERVER_URL
} from "../../constats";
import showUserMessage from "../../utils/showUserMessage";
import axios, { AxiosError } from "axios";
import Loader from "../ui/loader";
import ChangeOrCreateProductPopup from "../ui/changeOrCreateProductPopup";
import catchError from "../../utils/catchError";

/** Компонент страницы админинстратора. */
const AdminPage = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { initialize, progress, status } = useMockData();
    const catalog = useAppSelector<ICatalogItem[]>(getCatalog());
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    /** Функция восстанавливает базу данных до состояния, сохранённого в json-файле. */
    const restoreDB = async () => {
        const confirmation = confirm(restoreDBMessage);
        if (confirmation) {
            try {
                setIsLoading(true);
                await clearDB();
                setIsLoading(false);
                await initialize();
                await dispatch(loadCatalogList());
            } catch (e) {
                const error = e as AxiosError;
                catchError(error);
            }
        }
    };

    /** Функция полностью удаляет все товары из базы данных. */
    const clearDB = async () => {
        try {
            await Promise.all(
                catalog.map((product) =>
                    axios.delete(
                        SERVER_URL + "catalog/" + product.barcode + ".json"
                    )
                )
            );
        } catch (e) {
            const error = e as AxiosError;
            catchError(error);
        }
    };

    /** Функция удаляет выбранный товар из базы данных. */
    async function deleteItemFromDB(barcode: string) {
        const confirmation = confirm(removeFromDBConfirmMessage);
        if (confirmation) {
            try {
                setIsLoading(true);
                await axios.delete(SERVER_URL + "catalog/" + barcode + ".json");
                setIsLoading(false);
                await dispatch(loadCatalogList());
                showUserMessage("success", removeFromDBSuccessMessage);
            } catch (e) {
                const error = e as AxiosError;
                catchError(error);
            }
        }
    }

    if (isLoading) return <Loader />;

    return (
        <section className="adminPage" data-testid="adminPageOuter">
            <div className="container">
                <h1 className="pageTitle adminPage__title">
                    Страница администратора
                </h1>
                <div className="adminPage__backup">
                    <h3>Загрузка архивной копии базы данных</h3>
                    <ul>
                        <li>Статус: {status}</li>
                        <li>Завершено на {progress}%</li>
                    </ul>
                    <LinkButton
                        link={"#"}
                        classEl="adminPage__backupButton"
                        text="Загрузить"
                        icon={<BsBoxArrowDown />}
                        handleClick={wrapAsyncFunction(restoreDB)}
                    />
                </div>
                <div className="adminPage__backup">
                    <h3>Создание нового продукта</h3>
                    <LinkButton
                        link={"#"}
                        classEl="adminPage__backupButton"
                        text="Создать"
                        icon={<BsBricks />}
                        handleClick={openPopup}
                    />
                </div>
                {catalog.length === 0 && (
                    <div className="adminPage__emptyMessage">
                        На данный момент в базе нет ни одного товара. Создайте
                        новый товар либо загрузите архивную копию данных, при
                        помощи кнопок выше.
                    </div>
                )}
                {catalog.map((product) => (
                    <AdminProductItem
                        key={"adminProductCard " + product.barcode}
                        product={product}
                        deleteItemFromDB={wrapAsyncFunction(deleteItemFromDB)}
                        setIsLoading={setIsLoading}
                    />
                ))}
            </div>
            {isPopupOpen && (
                <ChangeOrCreateProductPopup
                    closePopup={closePopup}
                    setIsLoading={setIsLoading}
                />
            )}
        </section>
    );
};

export default AdminPage;
