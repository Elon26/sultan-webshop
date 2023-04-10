import React, { useEffect, useState } from "react";
import "../../styles/catalog.scss";
import { useAppSelector } from "../../hooks/reduxHook";
import { getCatalog } from "../../store/catalog";
import { ICatalogItem, IOtherFilters, ISort } from "../../models";
import { useClickCatcher } from "../../hooks/useClickCatcher";
import ProductCard from "../common/productCard";
import paginate from "../../utils/paginate";
import Pagination from "../ui/pagination";
import _ from "lodash";
import CatalogFilters from "../ui/catalogFilters";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import CatalogSortBlock from "../common/catalogSortBlock";

/** Компонент страницы каталога. */
const CatalogPage = (): React.ReactElement => {
    /** Функционал импортирует переменную текущей ширины экрана, текущего статуса фокуса на элементе сортировки и текущий перечень товаров. */
    const { windowWidth } = useWindowDimensions();
    const { sortInFocus } = useClickCatcher();
    const catalog = useAppSelector<ICatalogItem[]>(getCatalog());

    /** Функционал создаёт динамическую переменную, отвечающую за текущее значение фильтра по назначению, а также выполняет фильтарацию по данному фильтру при первичной отрисовке компонента, а также каждый раз, когда эта переменная изменяется. */
    const [purposeFilter, setPurposeFilter] = useState<string>("Показать всё");
    const purposeFilteredCatalog = purposeFilterCatalog(catalog, purposeFilter);

    /** Функционал создаёт динамическую переменную, отвечающую за текущее значение прочих фильтров, а также выполняет фильтарацию по данным фильтрам при первичной отрисовке компонента, а также каждый раз, когда эта переменная изменяется. */
    const [otherFilters, setOtherFilters] = useState<IOtherFilters>({
        minPrice: 0,
        maxPrice: 0,
        manufacturers: []
    });
    const filteredCatalog = purposeFilteredCatalog.filter(otherFilterCatalog);

    /** Функционал создаёт динамическую переменную, отвечающую за текущее значение параметров сортировки, а также выполняет соответствующую сортировку при первичной отрисовке компонента, а также каждый раз, когда эта переменная изменяется. */
    const [sortParams, setSortParams] = useState<ISort>({
        name: "name",
        direction: "asc"
    });
    const sortedCatalog = _.orderBy(
        filteredCatalog,
        sortParams.name,
        sortParams.direction
    );

    /** Функционал создаёт динамическую переменную, отвечающую за текущее значение страницы пагинации, статическую переменную, отвечающую за количество отображаемых элементов на странице пагинации, выполняет разделение общего числа товаров на страницы, а также отрисовывает (и перерисовывает при изменении динамической переменной) элементы, согласно установленным параметрам пагинации. */
    const pageSize = 15;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsCrop = paginate(sortedCatalog, currentPage, pageSize);

    /** Функционал собирает массив уникальных значений из полей с назначением товара всех существующих объектов товаров и добавляет в его начало дополнительный элемент для сброса фильтрации. Помимо этого, в конце раздела расположена переменная, предназначеная для сброса фильтрации по прочим параметрам, при изменении фильтра по назначению. */
    const purposesWithDoubles: string[] = [];
    catalog.forEach((item) => purposesWithDoubles.push(...item.purposes));
    const purposes = Array.from(new Set(purposesWithDoubles));
    purposes.unshift("Показать всё");
    const [purposeSwitcher, setPurposeSwitcher] = useState(false);

    /** Функция меняет параметр сортировки, а также открывает/закрывает меню сортировки по клику и переключает пагинацию на первую страницу. */
    function handleSortChange(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof HTMLElement) {
            const dropdown = document.querySelector(".sortDropdown");

            if (e.target.closest(".catalog__currentSort")) {
                dropdown?.classList.toggle("invisible");
            }

            if (e.target.closest(".sortDropdown__item")) {
                setCurrentPage(1);
                const selectedSortElement = e.target.closest(
                    ".sortDropdown__item"
                ) as HTMLElement;

                switch (selectedSortElement.dataset.sortValue) {
                    case "1":
                        setSortParams({ name: "name", direction: "asc" });
                        break;
                    case "2":
                        setSortParams({ name: "name", direction: "desc" });
                        break;
                    case "3":
                        setSortParams({ name: "price", direction: "asc" });
                        break;
                    case "4":
                        setSortParams({ name: "price", direction: "desc" });
                        break;
                    default:
                        break;
                }

                dropdown?.classList.add("invisible");
            }
        }
    }

    /** Функция меняет страницу отображения товаров. */
    function handlePageChange(index: number) {
        setCurrentPage(index + 1);
        window.scrollTo(0, 0);
    }

    /** Функция осуществляет фильтрацию товаров по выбранному параметру назначения */
    function purposeFilterCatalog(
        arr: ICatalogItem[],
        filter: string
    ): ICatalogItem[] {
        const result = arr.filter((item) => {
            if (filter === "Показать всё") {
                return item;
            } else {
                return item.purposes.includes(filter);
            }
        });

        return result;
    }

    /** Функция устанавливает переменную, отвечающую за параметр сортировки по назначению, чем запускает повторную фильтрацию, а также переключает пагинацию на первую страницу и очищает фильтрацию по прочим параметрам. */
    function handlePurposeFilter(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof HTMLElement) {
            setPurposeSwitcher((prevState) => !prevState);
            setOtherFilters({
                minPrice: 0,
                maxPrice: 0,
                manufacturers: []
            });
            setCurrentPage(1);
            const targetElement = e.target.closest(".purpose");
            const textContent = targetElement && targetElement.textContent;
            if (targetElement && textContent) {
                setPurposeFilter(textContent);
            }
        }
    }

    /** Функция запускает фильтрацию по указанным параметрам. */
    function otherFilterCatalog(item: ICatalogItem): boolean {
        return (
            item.price >= otherFilters.minPrice &&
            item.price <=
            (otherFilters.maxPrice ? otherFilters.maxPrice : 999999999) &&
            (otherFilters.manufacturers.length > 0
                ? otherFilters.manufacturers.includes(item.manufacturer)
                : true)
        );
    }

    /** Функция меняет параметры фильтрации не по назначению, чем запускает фильтрацию по указанным параметрам, а также переключает пагинацию на первую страницу. */
    function handleChangeOtherFilters(filters: IOtherFilters): void {
        setOtherFilters(filters);
        setCurrentPage(1);
    }

    /** Настройка закрывает меню сортировки при клике за пределами блока. */
    useEffect(() => {
        if (!sortInFocus) {
            const dropdown = document.querySelector(".sortDropdown");
            dropdown?.classList.add("invisible");
        }
    }, [sortInFocus]);

    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog__titleRow">
                    <h1 className="pageTitle pageTitle_withoutMargin">
                        Каталог
                    </h1>
                    {windowWidth > 767.98 && <CatalogSortBlock
                        sortParams={sortParams}
                        handleClick={handleSortChange}
                    />}
                </div>
                {windowWidth > 767.98 && (
                    <div
                        className="catalog__purposes"
                        onClick={handlePurposeFilter}
                    >
                        {purposes.map((purpose) => (
                            <div
                                key={purpose}
                                className={
                                    "catalog__purpose purpose" +
                                    (purposeFilter === purpose
                                        ? " selected"
                                        : "")
                                }
                                data-testid="catalogPagePurposes"
                            >
                                {purpose}
                            </div>
                        ))}
                    </div>
                )}
                <div className="catalog__body">
                    <aside className="catalog__filters catalogFilters">
                        <CatalogFilters
                            allCatalog={purposeFilteredCatalog}
                            filteredCatalog={filteredCatalog}
                            purposes={purposes}
                            handlePurposeClick={handlePurposeFilter}
                            purposeFilter={purposeFilter}
                            purposeSwitcher={purposeSwitcher}
                            handleChangeOtherFilters={handleChangeOtherFilters}
                        />
                    </aside>
                    {windowWidth <= 767.98 && <CatalogSortBlock
                        sortParams={sortParams}
                        handleClick={handleSortChange}
                    />}
                    <div className="catalog__content">
                        <div className="catalog__contentWrapper">
                            {productsCrop.length === 0 && (
                                <div className="catalog__emptyMessage">
                                    Товаров по запросу не найдено
                                </div>
                            )}
                            {productsCrop.map((productItem: ICatalogItem) => (
                                <ProductCard
                                    key={productItem.barcode}
                                    product={productItem}
                                />
                            ))}
                            <Pagination
                                totalQuantity={sortedCatalog.length}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                handleClick={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CatalogPage;
