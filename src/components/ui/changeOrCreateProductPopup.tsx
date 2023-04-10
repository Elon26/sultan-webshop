import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import "../../styles/changeOrCreateProductPopup.scss";
import { ICatalogItem, IFormError } from "../../models";
import translateProductFieldName from "../../utils/translateProductFieldName";
import {
    changeDBSuccessMessage,
    defaultProduct,
    defaultPurposes,
    productFieldOrderToShow
} from "../../constats";
import { AxiosError } from "axios";
import { loadCatalogList } from "../../store/catalog";
import { useAppDispatch } from "../../hooks/reduxHook";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import showUserMessage from "../../utils/showUserMessage";
import catchError from "../../utils/catchError";
import addProductToFirebase from "../../services/addProductToFirebase";

interface ChangeOrCreateProductPopupProps {
    closePopup(): void;
    product?: ICatalogItem;
    setIsLoading(prevState: boolean): void;
}

/** Компонент всплывающего окна. */
const ChangeOrCreateProductPopup = ({
    closePopup,
    product,
    setIsLoading
}: ChangeOrCreateProductPopupProps): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [currentProduct, setCurrentProduct] = useState<ICatalogItem>(
        product || defaultProduct
    );
    const [errors, setErrors] = useState<IFormError>({});

    /** Функция обрабатывает клик и вызывает закрытие компонента всплывающего окна при клике на соответсвующую иконку. Помимо этого, функция обрабатывает клики по полям ввода со всплывающими элементами: открывает/закрывает, а также меняет значение в текущем объекте товара, при клике на соответствующие поля. */
    function handleAreaClick(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof Element) {
            if (e.target.closest(".changeOrCreateProductPopup__closeIcon")) {
                handleClosePopup();
                return;
            }

            if (
                e.target.closest(
                    ".changeOrCreateProductPopup__currentValue_dimensionType"
                )
            ) {
                toggleDimensionTypeDropdown();
            }

            if (
                !e.target.closest(
                    ".changeOrCreateProductPopup__inputItem_dimensionTypeDropdown"
                )
            ) {
                closeDimensionTypeDropdown();
            }

            if (
                e.target.closest(
                    ".changeOrCreateProductPopup__dimensionTypeItem"
                )
            ) {
                const selectedValue = e.target.closest(
                    ".changeOrCreateProductPopup__dimensionTypeItem"
                )?.textContent;

                if (selectedValue) {
                    setCurrentProduct((prevState) => ({
                        ...prevState,
                        dimensionType: selectedValue
                    }));
                }

                closeDimensionTypeDropdown();
            }

            if (
                e.target.closest(
                    ".changeOrCreateProductPopup__currentValue_purposes"
                )
            ) {
                togglePurposesDropdown();
            }

            if (
                !e.target.closest(
                    ".changeOrCreateProductPopup__inputItem_purposesDropdown"
                )
            ) {
                closePurposesDropdown();
            }

            if (e.target.closest(".changeOrCreateProductPopup__purposesItem")) {
                const selectedValue = e.target.closest(
                    ".changeOrCreateProductPopup__purposesItem"
                )?.textContent;

                if (selectedValue) {
                    setErrors((prevState) => ({
                        ...prevState,
                        purposes: ""
                    }));

                    const oldPurposes = currentProduct.purposes;
                    let newPurposes = oldPurposes;

                    if (currentProduct.purposes.includes(selectedValue)) {
                        newPurposes = oldPurposes.filter(
                            (item) => item !== selectedValue
                        );
                    } else {
                        newPurposes = [...oldPurposes, selectedValue];
                    }
                    setCurrentProduct((prevState) => ({
                        ...prevState,
                        purposes: newPurposes
                    }));
                }

                closePurposesDropdown();
            }
        }
    }

    /** Функция вносит изменения в поля ввода и синхронизирует данные с сохранённым объектом. */
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        if (e.target.name === "price") {
            setCurrentProduct((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value === "" ? 0 : e.target.value
            }));
        } else {
            setCurrentProduct((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }

    /** Функция устанавливает запрет на изменения <input type=number> посредством случайной (либо неслучайной) прокрутки колёсиком мыши. */
    function canselWheel(e: React.WheelEvent<HTMLInputElement>): void {
        if (e.target instanceof HTMLElement) {
            e.target.blur();
        }
    }

    /** Функция осуществляет проверку данных на корректность ввода и создаёт соотвествующие ошибки, либо возвращает true, если проверка прошла успешно. */
    function validate(currentProduct: ICatalogItem): boolean {
        let validateSuccessful = true;

        for (const key in currentProduct) {
            if (
                key === "name" ||
                key === "brand" ||
                key === "manufacturer" ||
                key === "description"
            ) {
                if (currentProduct[key].trim() === "") {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Поле не должно быть пустым"
                    }));
                    validateSuccessful = false;
                }
            }

            if (key === "imgBig" || key === "imgSmall") {
                const regExp = /^(ftp|http|https):\/\/[^ "]+$/;
                if (!regExp.test(currentProduct[key])) {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Неверный адрес ссылки"
                    }));
                    validateSuccessful = false;
                }
            }

            if (key === "barcode") {
                if (currentProduct[key].length !== 13) {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Штрих-код должен состоять из 13-ти цифр"
                    }));
                    validateSuccessful = false;
                }
            }

            if (key === "dimension") {
                if (
                    currentProduct[key].trim() === "" ||
                    +currentProduct[key].trim() <= 0
                ) {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Поле должно быть числом, большим нуля"
                    }));
                    validateSuccessful = false;
                }
            }

            if (key === "price") {
                if (+currentProduct[key] <= 0) {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Поле должно быть числом, большим нуля"
                    }));
                    validateSuccessful = false;
                }
            }

            if (key === "purposes") {
                if (currentProduct[key].length === 0) {
                    setErrors((prevState) => ({
                        ...prevState,
                        [key]: "Поле не должно быть пустым"
                    }));
                    validateSuccessful = false;
                }
            }
        }

        return validateSuccessful;
    }

    /** Функция удаляет ошибку, при изменении поля ввода. */
    function clearError(field: string): void {
        setErrors((prevState) => ({
            ...prevState,
            [field]: ""
        }));
    }

    /** Функция закрывает всплывающее окно со списком назначений товаров. */
    function closePurposesDropdown(): void {
        document
            .querySelector(".changeOrCreateProductPopup__dropdown_purposes")
            ?.classList.remove("visible");
    }

    /** Функция отрывает/закрывает всплывающее окно со списком назначений товаров. */
    function togglePurposesDropdown(): void {
        document
            .querySelector(".changeOrCreateProductPopup__dropdown_purposes")
            ?.classList.toggle("visible");
    }

    /** Функция закрывает всплывающее окно с единицами измерения тары. */
    function closeDimensionTypeDropdown(): void {
        document
            .querySelector(
                ".changeOrCreateProductPopup__dropdown_dimensionType"
            )
            ?.classList.remove("visible");
    }

    /** Функция отрывает/закрывает всплывающее окно с единицами измерения тары. */
    function toggleDimensionTypeDropdown(): void {
        document
            .querySelector(
                ".changeOrCreateProductPopup__dropdown_dimensionType"
            )
            ?.classList.toggle("visible");
    }

    /** Функция запускает валидацию и, при успешном её прохождении, отправляет сохранённый объект в базу данных. */
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        e.preventDefault();
        setErrors({});
        const isValid = validate(currentProduct);

        if (isValid) {
            try {
                closePopup();
                setIsLoading(true);
                await addProductToFirebase(
                    currentProduct.barcode,
                    currentProduct
                );
                setIsLoading(false);
                await dispatch(loadCatalogList());
                showUserMessage("success", changeDBSuccessMessage);
            } catch (e) {
                const error = e as AxiosError;
                catchError(error);
            }
        }
    }

    /** Функция необходима для отрабатывания функционала плавного скрытия всплывающего окна. */
    function handleClosePopup(): void {
        document
            .querySelector(".changeOrCreateProductPopup")
            ?.classList.remove("visible");
        setTimeout(() => {
            closePopup();
        }, 500);
    }

    /** Настройка необходима для отрабатывания функционала плавного появления всплывающего окна. */
    setTimeout(() => {
        document
            .querySelector(".changeOrCreateProductPopup")
            ?.classList.add("visible");
    }, 0);

    return (
        <div className="changeOrCreateProductPopup" onClick={handleAreaClick}>
            <div className="changeOrCreateProductPopup__body">
                <div className="changeOrCreateProductPopup__closeIcon">
                    <BsX />
                </div>
                <div className="changeOrCreateProductPopup__title">
                    {product
                        ? "Форма изменения параметров продукта"
                        : "Форма создания нового продукта"}
                </div>
                <form
                    className="changeOrCreateProductPopup__form"
                    onSubmit={wrapAsyncFunction(handleSubmit)}
                >
                    {productFieldOrderToShow.map((key) => {
                        if (
                            key === "name" ||
                            key === "brand" ||
                            key === "imgBig" ||
                            key === "imgSmall" ||
                            key === "manufacturer" ||
                            key === "dimension"
                        ) {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={currentProduct[key]}
                                        onChange={handleChange}
                                        className={errors[key] ? "error" : ""}
                                        onInput={() => clearError(key)}
                                    />
                                    {errors[key] && <span>{errors[key]}</span>}
                                </div>
                            );
                        }

                        if (key === "barcode") {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <input
                                        type="number"
                                        name={key}
                                        value={currentProduct[key]}
                                        onChange={handleChange}
                                        className={errors[key] ? "error" : ""}
                                        onInput={() => clearError(key)}
                                        onWheel={canselWheel}
                                    />
                                    {errors[key] && <span>{errors[key]}</span>}
                                </div>
                            );
                        }

                        if (key === "price") {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <input
                                        type="number"
                                        name={key}
                                        value={
                                            currentProduct[key] === 0
                                                ? ""
                                                : currentProduct[key]
                                        }
                                        onChange={handleChange}
                                        className={errors[key] ? "error" : ""}
                                        onInput={() => clearError(key)}
                                        onWheel={canselWheel}
                                    />
                                    {errors[key] && <span>{errors[key]}</span>}
                                </div>
                            );
                        }

                        if (key === "description") {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <div
                                        className={
                                            "changeOrCreateProductPopup__textareaOuter" +
                                            (errors[key] ? " error" : "")
                                        }
                                    >
                                        <textarea
                                            name={key}
                                            value={currentProduct[key]}
                                            onChange={handleChange}
                                            onInput={() => clearError(key)}
                                        />
                                    </div>
                                    {errors[key] && <span>{errors[key]}</span>}
                                </div>
                            );
                        }

                        if (key === "dimensionType") {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem changeOrCreateProductPopup__inputItem_dimensionTypeDropdown"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <div className="changeOrCreateProductPopup__currentValue changeOrCreateProductPopup__currentValue_dimensionType">
                                        {currentProduct[key]}
                                    </div>
                                    <div className="changeOrCreateProductPopup__dropdown changeOrCreateProductPopup__dropdown_dimensionType">
                                        <div className="changeOrCreateProductPopup__dimensionTypeItem">
                                            мл
                                        </div>
                                        <div className="changeOrCreateProductPopup__dimensionTypeItem">
                                            гр
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (key === "purposes") {
                            return (
                                <div
                                    key={"productPopup" + key}
                                    className="changeOrCreateProductPopup__inputItem changeOrCreateProductPopup__inputItem_purposesDropdown"
                                >
                                    <label>
                                        {translateProductFieldName(key)}
                                    </label>
                                    <div
                                        className={
                                            "changeOrCreateProductPopup__currentValue changeOrCreateProductPopup__currentValue_purposes" +
                                            (errors[key] ? " error" : "")
                                        }
                                    >
                                        {currentProduct[key].join(", ")}
                                    </div>
                                    <div className="changeOrCreateProductPopup__dropdown changeOrCreateProductPopup__dropdown_purposes">
                                        {defaultPurposes.map((purpose) => (
                                            <div
                                                key={
                                                    "defaultPurposes" + purpose
                                                }
                                                className={
                                                    "changeOrCreateProductPopup__purposesItem" +
                                                    (currentProduct[
                                                        key
                                                    ].includes(purpose)
                                                        ? " selected"
                                                        : "")
                                                }
                                            >
                                                {purpose}
                                            </div>
                                        ))}
                                    </div>
                                    {errors[key] && <span>{errors[key]}</span>}
                                </div>
                            );
                        }

                        return null;
                    })}
                    <button
                        type="submit"
                        className="changeOrCreateProductPopup__formButton button"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangeOrCreateProductPopup;
