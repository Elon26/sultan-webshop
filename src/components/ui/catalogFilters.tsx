import React, { useEffect, useState } from "react";
import {
    BsSearch,
    BsFillTrashFill,
    BsCaretDownFill,
    BsChevronDown,
    BsChevronUp
} from "react-icons/bs";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ICatalogItem, IOtherFilters, IStringObject } from "../../models";

interface CatalogFiltersProps {
    filteredCatalog: ICatalogItem[];
    allCatalog: ICatalogItem[];
    purposes: string[];
    handlePurposeClick(e: React.MouseEvent<HTMLElement>): void;
    purposeFilter: string;
    purposeSwitcher: boolean;
    handleChangeOtherFilters(sortParams: IOtherFilters): void;
}

/** Компонент фильтров бокового меню со страницы каталога товаров. */
const CatalogFilters = ({
    filteredCatalog,
    allCatalog,
    purposes,
    handlePurposeClick,
    purposeFilter,
    purposeSwitcher,
    handleChangeOtherFilters
}: CatalogFiltersProps): React.ReactElement => {
    const { windowWidth } = useWindowDimensions();
    const [hideFilterSwitcher, setHideFilterSwitcher] = useState<boolean>(true);
    const allManufacturersInternals = allCatalog
        .map((item) => item.manufacturer)
        .sort();
    const [quantityOfManufacturersForShow, setQuantityOfManufacturersForShow] =
        useState<number>(windowWidth <= 767.98 ? 2 : 4);

    /** Функционал данного раздела создаёт два массива, которые по одинаковым индексам хранят производителя и число товаров данного производителя, присутствующее в базе данных. */
    const manufacturersInternals = filteredCatalog
        .map((item) => item.manufacturer)
        .sort();
    const [manufacturersInternalsFiltered, setManufacturersInternalsFiltered] =
        useState(manufacturersInternals);
    const manufacturers: string[] = [];
    const manufacturersCounters: number[] = [];
    manufacturersInternalsFiltered.forEach((manufacturer) => {
        if (manufacturers.includes(manufacturer)) {
            const index = manufacturers.indexOf(manufacturer);
            manufacturersCounters[index]++;
        } else {
            manufacturers.push(manufacturer);
            manufacturersCounters.push(1);
        }
    });

    const defaultParams = {
        minPrice: "0",
        maxPrice: "0",
        manufacturerFilter: ""
    };
    const [formValues, setFormValues] = useState<IStringObject>(defaultParams);

    /** Функция отменяет отправку формы, при использовании стандартного функционала Submit (в т.ч. при нажатии Enter на любом поле формы), чтобы исключить отправку формы при работе с полем фильтрации производителей. */
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    /** Функция убирает 0 при фокусе на поле ввода. */
    function clearNull(e: React.FormEvent<HTMLInputElement>): void {
        if (e.target instanceof HTMLInputElement && e.target.value === "0") {
            e.target.value = "";
        }
    }

    /** Функция добавляет "0" при убирании фокуса с поля ввода, если оно пустое или содержит несколько нулей. */
    function addNull(e: React.FormEvent<HTMLInputElement>): void {
        if (
            e.target instanceof HTMLInputElement &&
            (e.target.value === "" || +e.target.value === 0)
        ) {
            e.target.value = "0";
        }
    }

    /** Функция синхронизирует вводимые пользователем значения и переменную, хранящую эти данные, а также проверяет и корректирует согласованность диапазона цен, т.е. исключает вероятность такого запроса, как "больше пяти и меньше трёх". */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.name.startsWith("manufacturer/")) {
            if (e.target.checked) {
                setFormValues((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                }));
            } else {
                setFormValues((prevState) => {
                    delete prevState[e.target.name];
                    return prevState;
                });
            }
        } else {
            setFormValues((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }

        if (e.target instanceof HTMLInputElement) {
            if (
                e.target.name === "minPrice" &&
                +formValues.maxPrice < +e.target.value
            ) {
                setFormValues((prevState) => ({
                    ...prevState,
                    maxPrice: e.target.value
                }));
            }

            if (
                e.target.name === "maxPrice" &&
                +formValues.minPrice > +e.target.value
            ) {
                setFormValues((prevState) => ({
                    ...prevState,
                    minPrice: e.target.value
                }));
            }
        }
    }

    /** Функция выполняет внутреннюю фильтрацию производителей по значению введённому пользователем. */
    function handleManufacturersSort(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        clearСheckboxes();
        setManufacturersInternalsFiltered(
            manufacturersInternals.filter((item) => {
                if (item.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return item;
                }
                return null;
            })
        );
    }

    /** Функция осуществляет сбор и отправку параметров фильтрации каталога товаров. */
    function submitForm(): void {
        const sortParams: IOtherFilters = {
            minPrice: +formValues.minPrice,
            maxPrice: +formValues.maxPrice,
            manufacturers: []
        };

        const manufacturersBadKeys = Object.keys(formValues).filter((key) =>
            key.startsWith("manufacturer/")
        );
        const manufacturersKeys = manufacturersBadKeys.map((item) =>
            item.split("/")
        );
        manufacturersKeys.forEach((item) =>
            sortParams.manufacturers.push(item[1])
        );

        handleChangeOtherFilters(sortParams);
    }

    /** Функция очищает критерии фильтрации. */
    function clearForm(): void {
        setFormValues(() => defaultParams);
        clearСheckboxes();
        setManufacturersInternalsFiltered(allManufacturersInternals);
    }

    /** Функция очищает все чекбоксы. */
    function clearСheckboxes(): void {
        const form = document.querySelector(".catalogFilters__paramFilters");
        const checkboxes = form?.querySelectorAll("[type='checkbox']");

        checkboxes &&
            checkboxes.forEach((checkbox) => {
                if (checkbox instanceof HTMLInputElement) {
                    checkbox.checked = false;
                }
            });
    }

    /** Функция очищает критерии фильтрации. */
    function showAllManufacturers(): void {
        setQuantityOfManufacturersForShow(
            manufacturersInternalsFiltered.length
        );
    }

    /** Настройка очищает внутренние фильтры по факту изменения параметров фильтрации по назначению. */
    useEffect(() => {
        clearForm();
    }, [purposeSwitcher]);

    /** Настройка меняет количество производителей к отображению по умолчанию при изменении ширины экрана, без необходимости перезагрузки страницы. */
    useEffect(() => {
        if (windowWidth <= 767.98) {
            setQuantityOfManufacturersForShow(2);
        } else {
            setQuantityOfManufacturersForShow(4);
        }
    }, [windowWidth]);

    return (
        <div className="catalogFilters__body">
            <form
                className="catalogFilters__paramFilters"
                onSubmit={handleSubmit}
            >
                {windowWidth > 767.98 && (
                    <div className="catalogFilters__title">
                        ПОДБОР ПО ПАРАМЕТРАМ
                    </div>
                )}
                {windowWidth <= 767.98 && (
                    <div
                        className="catalogFilters__titleRow"
                        onClick={() =>
                            setHideFilterSwitcher((prevState) => !prevState)
                        }
                    >
                        <div className="catalogFilters__title catalogFilters__title_withoutMB">
                            ПОДБОР ПО ПАРАМЕТРАМ
                        </div>
                        <div className="catalogFilters__titleButton">
                            {hideFilterSwitcher ? (
                                <BsChevronDown />
                            ) : (
                                <BsChevronUp />
                            )}
                        </div>
                    </div>
                )}
                <div
                    className={
                        "catalogFilters__paramsFilters" +
                        (windowWidth <= 767.98 && hideFilterSwitcher
                            ? " invisible"
                            : "")
                    }
                >
                    <div className="catalogFilters__filterItem">
                        <div className="catalogFilters__title">Цена, ₽</div>
                        <div className="catalogFilters__priceFilters">
                            <input
                                type="number"
                                name="minPrice"
                                value={+formValues.minPrice}
                                onChange={handleChange}
                                onFocus={clearNull}
                                onBlur={addNull}
                                className="catalogFilters__priceFilter"
                            />
                            <span> - </span>
                            <input
                                type="number"
                                name="maxPrice"
                                value={+formValues.maxPrice}
                                onChange={handleChange}
                                onFocus={clearNull}
                                onBlur={addNull}
                                className="catalogFilters__priceFilter"
                            />
                        </div>
                    </div>
                    <div className="catalogFilters__filterItem">
                        <div className="catalogFilters__title">
                            Производитель
                        </div>
                        <div className="catalogFilters__subsearch">
                            <input
                                type="text"
                                placeholder="Поиск"
                                name="manufacturerFilter"
                                onChange={handleChange}
                                onInput={handleManufacturersSort}
                                value={formValues.manufacturerFilter}
                            />
                            <div>
                                <BsSearch />
                            </div>
                        </div>
                        <div className="catalogFilters__checkboxArea">
                            {manufacturers.map(
                                (manufacturer, index) =>
                                    index < quantityOfManufacturersForShow && (
                                        <div
                                            className="catalogFilters__checkboxItem"
                                            key={"manufacturer/" + manufacturer}
                                        >
                                            <input
                                                type="checkbox"
                                                name={
                                                    "manufacturer/" +
                                                    manufacturer
                                                }
                                                id={
                                                    "manufacturer/" +
                                                    manufacturer
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                htmlFor={
                                                    "manufacturer/" +
                                                    manufacturer
                                                }
                                            >{`${manufacturer} (${manufacturersCounters[index]})`}</label>
                                        </div>
                                    )
                            )}
                            {quantityOfManufacturersForShow < manufacturers.length && (
                                <div
                                    className="catalogFilters__showAllManufacturers"
                                    onClick={showAllManufacturers}
                                >
                                    <span>Показать всё</span>
                                    <BsCaretDownFill />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="catalogFilters__buttons">
                        <div
                            onClick={submitForm}
                            className="catalogFilters__submitButton button"
                        >
                            <span>Показать</span>
                        </div>
                        <div
                            onClick={clearForm}
                            className="catalogFilters__clearButton button"
                        >
                            <BsFillTrashFill />
                        </div>
                    </div>
                </div>
                <div className="catalogFilters__title">
                    ПОДБОР ПО НАЗНАЧЕНИЮ
                </div>
                <div
                    className="catalogFilters__purposes"
                    onClick={handlePurposeClick}
                >
                    {purposes.map((purpose) => (
                        <div
                            key={"purpose:" + purpose}
                            className={
                                "catalogFilters__purpose purpose" +
                                (purposeFilter === purpose ? " selected" : "")
                            }
                        >
                            {purpose}
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default CatalogFilters;
